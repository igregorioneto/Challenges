import { Article } from "../entity/article";

export type ArticleOrderBy = {
    upvotes?: boolean;
    date?: boolean;
}

export interface ArticleGateway {
    save(article: Article): Promise<void>;
    list(orderBy?: ArticleOrderBy): Promise<Article[]>;
}