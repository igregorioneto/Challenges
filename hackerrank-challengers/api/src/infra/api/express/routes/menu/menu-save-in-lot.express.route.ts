import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { MenuSaveInLotOutputDto, MenuSaveInLotUsecase } from "../../../../../usecases/menu/manu-save-in-lot/manu-save-in-lot.usecase";

export type MenuSaveInLotRequestDto = {
    lot: {
        title: string;
        path: string;
        icon: string;
    }[];
}

export type MenuSaveInLotResponseDto = {
    ids: {
        id: string;
    }[];
}

export class MenuSaveInLotExpressRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly menuService: MenuSaveInLotUsecase
    ) { }

    public static create(menuService: MenuSaveInLotUsecase) {
        return new MenuSaveInLotExpressRoute(
            "/menu/lot",
            HttpMethod.POST,
            menuService
        );
    }

    getHandler() {
        return async (request: Request, response: Response) => {
            try {
                const { lot } = request.body as MenuSaveInLotRequestDto;
                
                const output = await this.menuService.execute({ lot });
                const responseBody = this.present(output);

                response.status(201).json({
                    message: 'Creating menus in lot',
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

    private present(output: MenuSaveInLotOutputDto) {
        const response: MenuSaveInLotResponseDto = {
            ids: output.ids
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