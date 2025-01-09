import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { ListArticleOutputDto, ListArticleUsecase } from "../../../../../usecases/article/list/list-article.usecase";

export type ListArticleResponseDto = {
    articles: {
        id: string;
        title: string;
        upvotes: number;
        date: number;
    }[]
}

export class ListArticleExpressRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listArticleService: ListArticleUsecase
    ) {}

    public static create(listArticleService: ListArticleUsecase) {
        return new ListArticleExpressRoute(
            "/articles",
            HttpMethod.GET,
            listArticleService
        );
    }
    
    getHandler() {
        return async (request: Request, response: Response) => {
            const { upvotes, date } = request.query;
            try {
                const upvotesOrderBy = upvotes ? true : false;
                const dateOrderBy = date ? true : false;

                const output = await this.listArticleService.execute({ 
                    upvotes: upvotesOrderBy,
                    date: dateOrderBy
                });

                const responseBody = this.present(output);

                response.status(200).json(responseBody);
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

    present(output: ListArticleOutputDto) {
        const response: ListArticleResponseDto = {
            articles: output.articles.map((a) => ({
                id: a.id,
                title: a.title,
                upvotes: a.upvotes,
                date: a.date
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