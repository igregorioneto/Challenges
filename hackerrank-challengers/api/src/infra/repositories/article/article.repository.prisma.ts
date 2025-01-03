import { PrismaClient } from "@prisma/client";
import { Article } from "../../../domain/article/entity/article";
import { ArticleGateway, ArticleOrderBy } from "../../../domain/article/gateway/article.gateway";

export class ArticleRepositoryPrisma implements ArticleGateway {
    private constructor(private readonly prismaClient: PrismaClient) { }

    public static create(prismaClient: PrismaClient) {
        return new ArticleRepositoryPrisma(prismaClient);
    }

    async save(article: Article): Promise<void> {
        const data = {
            id: article.id,
            title: article.title,
            upvotes: article.upvotes,
            date: new Date(article.date)
        };

        await this.prismaClient.article.create({
            data,
        })
    }

    async list(orderBy?: ArticleOrderBy): Promise<Article[]> {
        const articles = await this.prismaClient.article.findMany({ 
            orderBy: orderBy?.upvotes
                ? { upvotes: "desc" }
                : orderBy?.date
                    ? { date: "desc" }
                    : undefined
        });
        return articles.map((a) => {
            return Article.with({
                id: a.id,
                title: a.title,
                upvotes: a.upvotes,
                date: a.date.getTime()
            })
        })
    }
}