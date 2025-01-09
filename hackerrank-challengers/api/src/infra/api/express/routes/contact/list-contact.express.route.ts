import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { ListContactOutputDto, ListContactUsecase } from "../../../../../usecases/contact/list/list-contact.usecase";

export type ListContactResponseDto = {
    contacts: {
        id: string;
        name: string;
        email: string;
        message: string;
    }[];
}

export class ListContactExpressRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly contactService: ListContactUsecase
    ) {}

    public static create(contactService: ListContactUsecase) {
        return new ListContactExpressRoute(
            "/contacts",
            HttpMethod.GET,
            contactService
        );
    }

    getHandler() {
        return async (request: Request, response: Response) => {
            try {
                const contacts = await this.contactService.execute();

                const responseBody = this.present(contacts);

                response.status(200).json({ 
                    message: 'List contacts',
                    success: true,
                    body: responseBody
                });
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
                    .json({ message: 'An unknown error occurred', success: false });
                }
            }
        }
    }

    present(output: ListContactOutputDto) {
        const response: ListContactResponseDto = {
            contacts: output.contacts.map((c) => ({                
                id: c.id,
                name: c.name,
                email: c.email,
                message: c.message
            }))
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