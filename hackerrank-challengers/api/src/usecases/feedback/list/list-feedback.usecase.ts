import { Feedback } from "../../../domain/feedback/entity/feedback";
import { FeedbackGateway } from "../../../domain/feedback/gateway/feedback.gateway";
import { Usecase } from "../../usecase";

export type ListFeedbackInputDto = void;

export type ListFeedbackOutputDto = {
    feedbacks: {
        id: string;
        title: string;
        upvotes: number;
        downvotes: number;
    }[];
};

export class ListFeedbackUsecase implements Usecase<ListFeedbackInputDto, ListFeedbackOutputDto> {
    
    private constructor(private readonly feedbackGatway: FeedbackGateway) {}

    public static create(feedbackGatway: FeedbackGateway) {
        return new ListFeedbackUsecase(feedbackGatway);
    }
    
    async execute(): Promise<ListFeedbackOutputDto> {
        const feedbacks = await this.feedbackGatway.list();

        const output = this.presentOutput(feedbacks);

        return output;
    }

    private presentOutput(feedbacks: Feedback[]): ListFeedbackOutputDto {
        return {
            feedbacks: feedbacks.map((f) => ({
                    id: f.id,
                    title: f.title,
                    upvotes: f.upvotes,
                    downvotes: f.downvotes
                }))
        }
    }
    
}
