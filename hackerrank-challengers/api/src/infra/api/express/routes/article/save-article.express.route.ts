import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { SaveArticleInputDto, SaveArticleOutput, SaveArticleUsecase } from "../../../../../usecases/article/save/save-article.usecase";

export type SaveArticleRequestDto = {
    title: string;
    upvotes: number;
}

export type SaveArticleResponseDto = {
    id: string;
}

export class SaveArticleExpressRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly saveArticleService: SaveArticleUsecase
    ) {}

    public static create(saveArticleService: SaveArticleUsecase) {
        return new SaveArticleExpressRoute(
            "/articles",
            HttpMethod.POST,
            saveArticleService
        );
    }

    getHandler() {
        return async (request: Request, response: Response) => {
            const { title, upvotes } = request.body as SaveArticleInputDto;
            try {
                if (!title || !upvotes) {
                    response.status(404).json({ message: 'Title or Upvotes not found', success: false })
                    return;
                }

                const output: SaveArticleOutput = 
                    await this.saveArticleService.execute({ title, upvotes });

                const responseBody = this.present(output);

                response.status(201).json({ body: responseBody, success: true });
            } catch (error) {
                if (error instanceof Error) {
                    response
                        .status(500)
                        .json({ message: error.message, success: false })
                } else {
                    response
                        .status(500)
                        .json({ message: 'An unknown error occurred', success: false })
                }
            }
        }
    }

    present(output: SaveArticleOutput) {
        const response: SaveArticleResponseDto = {
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