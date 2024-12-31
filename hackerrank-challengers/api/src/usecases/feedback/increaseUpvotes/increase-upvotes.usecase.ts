import { FeedbackGatway } from "../../../domain/feedback/gateway/feedback.gatway";
import { Usecase } from "../../usecase";

export type IncreaseUpvotesInputDto = {
    id: string;
}

export type IncreaseUpvotesOutputDto = void;

export class IncreaseUpvotesUsecase implements Usecase<IncreaseUpvotesInputDto, IncreaseUpvotesOutputDto> {
    private constructor(private readonly feedbackGateway: FeedbackGatway) {}

    public static create(feedbackGateway: FeedbackGatway) {
        return new IncreaseUpvotesUsecase(feedbackGateway);
    }
    
    async execute(input: IncreaseUpvotesInputDto): Promise<void> {
        const feedback = await this.feedbackGateway.getById(input.id);

        if (!feedback) {
            throw new Error("Feedback not found");
        }

        feedback?.increaseUpvotes();

        await this.feedbackGateway.increaseUpvotes(feedback);
    }

}