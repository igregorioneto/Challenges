import { Feedback } from "../../../domain/feedback/entity/feedback";
import { FeedbackGatway } from "../../../domain/feedback/gateway/feedback.gatway";
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
    
    private constructor(private readonly feedbackGatway: FeedbackGatway) {}
    
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
