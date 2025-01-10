import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { MenuListOutputDto, MenuListUsecase } from "../../../../../usecases/menu/list/menu-list.usecase";

export type MenuListResponseDto = {
    items: {
        id: string;
        title: string;
        path: string;
        icon: string;
    }[];
}

export class MenuListExpressRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly menuService: MenuListUsecase
    ) { }

    public static create(menuService: MenuListUsecase) {
        return new MenuListExpressRoute(
            "/menu",
            HttpMethod.GET,
            menuService
        );
    }

    getHandler() {
        return async (request: Request, response: Response) => {
            try {
                const output = await this.menuService.execute();

                const responseBody = this.present(output);

                response.status(200).json({ 
                    message: 'Menu List',
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

    private present(output: MenuListOutputDto) {
        const response: MenuListResponseDto = {
            items: output.items.map((item) => ({
                id: item.id,
                title: item.title,
                path: item.path,
                icon: item.icon
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