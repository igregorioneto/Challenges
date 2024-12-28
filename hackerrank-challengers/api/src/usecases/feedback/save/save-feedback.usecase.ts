import { Feedback } from "../../../domain/feedback/entity/feedback";
import { FeedbackGatway } from "../../../domain/feedback/gateway/feedback.gatway";
import { Usecase } from "../../usecase";

export type CreateFeedbackInputDto = {
    title: string;
}

export type CreateFeedbackOutputDto = {
    id: string;
}

export class SaveFeedbackUsecase implements Usecase<CreateFeedbackInputDto, CreateFeedbackOutputDto>{
    
    private constructor(private readonly feedbackGatway: FeedbackGatway) {}

    async execute({ title }: CreateFeedbackInputDto): Promise<CreateFeedbackOutputDto> {
        const feedback = Feedback.create(title);

        await this.feedbackGatway.save(feedback);

        const output =  this.presentOutput(feedback);
        return output;
    }

    private presentOutput(feedback: Feedback): CreateFeedbackOutputDto {
        const output: CreateFeedbackOutputDto = {
            id: feedback.id
        };
        return output;
    }
    
}