import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { SaveContactInputDto, SaveContactOutputDto, SaveContactUsecase } from "../../../../../usecases/contact/save/save-contact.usecase";
import { ContactProps } from "../../../../../domain/contact/entity/contact";
import { isValidEmail } from "../../../../../util";

export type SaveContactRequestDto = {
    name: string;
    email: string;
    message: string;
}

export type SaveContactResponseDto = {
    id: string;
}

export class SaveContactExpressRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly contactService: SaveContactUsecase
    ) { }

    public static create(contactService: SaveContactUsecase) {
        return new SaveContactExpressRoute(
            "/contacts",
            HttpMethod.POST,
            contactService
        );
    }

    getHandler() {
        return async (request: Request, response: Response) => {
            const { name, email, message } = request.body as SaveContactInputDto;
            try {
                if (!name || !email || !message) {
                    response.status(404).json({ message: 'Name, Email or Message not found', success: false });
                    return;
                }

                const emailIsValid = isValidEmail(email);
                if (!emailIsValid) {
                    response.status(400).json({ message: 'Invalid email format', success: false  });
                    return;
                }

                const output = await this.contactService.execute({ name, email, message });

                const responseBody = this.present(output);
                response.status(201).json({ 
                    message: 'Contact create with successfully', 
                    success: true,
                    body: responseBody
                })                
            } catch (error) {
               if (error instanceof Error) {
                response
                    .status(500)
                    .json({
                        message: error.message,
                        success: false
                    });
               } else {
                response
                    .status(500)
                    .json({ message: 'An unknown error occurred', success: false })
               } 
            }
        }
    }

    private present(output: SaveContactOutputDto) {
        const response: SaveContactResponseDto = {
            id: output.id,
        }
        return response;
    }

    getPath(): string {
        return this.path;
    }

    getMethod(): HttpMethod {
        return this.method;
    }
    
}