import { PrismaClient } from "@prisma/client";
import { Feedback } from "../../../domain/feedback/entity/feedback";
import { FeedbackGatway } from "../../../domain/feedback/gateway/feedback.gatway";

export class FeedbackRepositoryPrisma implements FeedbackGatway {

    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient) {
        return new FeedbackRepositoryPrisma(prismaClient);
    }

    public async save(feedback: Feedback): Promise<void> {
        const data = {
            id: feedback.id,
            title: feedback.title,
            upvotes: feedback.upvotes,
            downvotes: feedback.downvotes
        }

        await this.prismaClient.feedback.create({
            data,
        })
    }

    public async list(): Promise<Feedback[]> {
        const feedbacks = await this.prismaClient.feedback.findMany();

        return feedbacks.map((f) => {
            return Feedback.with({
                id: f.id,
                title: f.title,
                upvotes: f.upvotes,
                downvotes: f.downvotes
            })
        });
    }

    public async getById(id: string): Promise<Feedback | null> {
        const feedback = await this.prismaClient.feedback.findFirst({ where: { id } });

        return feedback ? Feedback.with({
            id: feedback.id,
            title: feedback.title,
            upvotes: feedback.upvotes,
            downvotes: feedback.downvotes
        }) : null;
    }

    public async increaseUpvotes(feedback: Feedback): Promise<void> { 
        await this.prismaClient.feedback.update({
            where: { id: feedback.id },
            data: { upvotes: feedback.upvotes }
        });
    }

    public async increaseDownvotes(feedback: Feedback): Promise<void> {
        await this.prismaClient.feedback.update({
            where: { id: feedback.id },
            data: { downvotes: feedback.downvotes }
        })
    }
    
}