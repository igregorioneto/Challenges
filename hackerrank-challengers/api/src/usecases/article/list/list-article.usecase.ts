import { Article } from "../../../domain/article/entity/article";
import { ArticleGateway } from "../../../domain/article/gateway/article.gateway";
import { Usecase } from "../../usecase";

export type ListArticleInputDto = {
    upvotes?: boolean;
    date?: boolean;
}

export type ListArticleOutputDto = {
    articles: {
        id: string;
        title: string;
        upvotes: number;
        date: number;
    }[]
}

export class ListArticleUsecase implements Usecase<ListArticleInputDto,ListArticleOutputDto > {
    private constructor(private readonly articleGateway: ArticleGateway) {}

    public static create(articleGateway: ArticleGateway) {
        return new ListArticleUsecase(articleGateway);
    }

    async execute(input: ListArticleInputDto): Promise<ListArticleOutputDto> {
        const articles = await this.articleGateway.list(input);

        const output = this.presentOutput(articles);

        return output;
    }

    presentOutput(articles: Article[]): ListArticleOutputDto {
        return {
            articles: articles.map((article) => ({
                id: article.id,
                title: article.title,
                upvotes: article.upvotes,
                date: article.date
            }))
        }
    }

}