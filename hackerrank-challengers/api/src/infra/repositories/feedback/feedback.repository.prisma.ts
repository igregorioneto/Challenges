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

    increaseUpvotes(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    increaseDownvotes(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}