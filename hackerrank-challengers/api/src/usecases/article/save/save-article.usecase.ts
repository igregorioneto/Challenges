import { Article } from "../../../domain/article/entity/article";
import { ArticleGateway } from "../../../domain/article/gateway/article.gateway";
import { Usecase } from "../../usecase";

export type SaveArticleInputDto = {
    title: string;
    upvotes: number;
}

export type SaveArticleOutput = {
    id: string;
};

export class SaveArticleUsecase implements Usecase<SaveArticleInputDto, SaveArticleOutput> {
    private constructor(private readonly articleGateway: ArticleGateway) {}

    public static create(articleGateway: ArticleGateway) {
        return new SaveArticleUsecase(articleGateway);
    }
    
    async execute({ title, upvotes }: SaveArticleInputDto): Promise<SaveArticleOutput> {
        const article = Article.create(title, upvotes);

        await this.articleGateway.save(article);

        const output = this.presentArticle(article);
        return output;
    }

    presentArticle(article: Article): SaveArticleOutput {
        return {
            id: article.id
        }
    }

}