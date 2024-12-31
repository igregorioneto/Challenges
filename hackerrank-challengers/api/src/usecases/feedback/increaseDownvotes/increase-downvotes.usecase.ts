import { FeedbackGatway } from "../../../domain/feedback/gateway/feedback.gatway";
import { Usecase } from "../../usecase";

export type IncreaseDownvotesInputDto = {
    id: string;
}

export type IncreateDownvotesOutputDto = void;

export class IncreaseDownvotesUsecase implements Usecase<IncreaseDownvotesInputDto, IncreateDownvotesOutputDto> {
    private constructor(private readonly feedbackGateway: FeedbackGatway) {}

    public static create(feedbackGateway: FeedbackGatway) {
        return new IncreaseDownvotesUsecase(feedbackGateway);
    }
    
    async execute(input: IncreaseDownvotesInputDto): Promise<void> {
        const feedback = await this.feedbackGateway.getById(input.id);

        if (!feedback) {
            throw new Error("Feedback not found");
        }

        feedback.increaseDownvotes();

        await this.feedbackGateway.increaseDownvotes(feedback);
    }
    
}