import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { MenuSaveOutputDto, MenuSaveUsecase } from "../../../../../usecases/menu/save/menu-save.usecase";

export type MenuSaveRequestDto = {
    title: string;
    path: string;
    icon: string;
}

export type MenuSaveResponseDto = {
    id: string;
}

export class MenuSaveExpressRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly menuService: MenuSaveUsecase
    ) { }

    public static create(menuService: MenuSaveUsecase) {
        return new MenuSaveExpressRoute(
            "/menu",
            HttpMethod.POST,
            menuService
        );
    }

    getHandler() {
        return async (request: Request, response: Response) => {
            try {
                const { title, path, icon } = request.body as MenuSaveRequestDto;

                if (!title || !path || !icon) {
                    response.status(404).json({ message: 'Title, Path or Icon not found', success: false });
                    return;
                }

                const output = await this.menuService.execute({ title, path, icon });

                const responseBody = this.present(output);

                response.status(201).json({ 
                    message: 'Item menu created with successfully',
                    success: true,
                    body: responseBody
                });                
            } catch (error) {
                if (error instanceof Error) {
                    response
                        .status(500)
                        .json({ message: error.message, success: false });
                } else {
                    response
                        .status(500)
                        .json({ message: 'An unknown error occurred', success: false });
                }
            }
        }
    }

    private present(output: MenuSaveOutputDto) {
        const response: MenuSaveResponseDto = {
            id: output.id
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