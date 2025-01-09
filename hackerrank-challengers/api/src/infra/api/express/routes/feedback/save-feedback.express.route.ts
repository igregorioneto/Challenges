import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { CreateFeedbackInputDto, SaveFeedbackUsecase } from "../../../../../usecases/feedback/save/save-feedback.usecase";

export type CreateFeedbackResponseDto = {
    id: string;
}

export class SaveFeedbackExpressRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly saveFeedbackService: SaveFeedbackUsecase
    ) {}

    public static create(saveFeedbackService: SaveFeedbackUsecase) {
        return new SaveFeedbackExpressRoute(
            "/feedbacks",
            HttpMethod.POST,
            saveFeedbackService
        );
    }

    getHandler() {
        return async (request: Request, response: Response) => {
            const { title } = request.body;

            const input: CreateFeedbackInputDto = {
                title
            }

            const output: CreateFeedbackResponseDto =
                await this.saveFeedbackService.execute(input);

            const responseBody = this.present(output);

            response.status(201).json({ 
                message: 'Feedback created with successfully',
                success: true,
                body: responseBody
            });
        }
    }

    getPath(): string {
        return this.path;
    }

    getMethod(): HttpMethod {
        return this.method;
    }

    private present(input: CreateFeedbackResponseDto): CreateFeedbackResponseDto {
        const response = { id: input.id };
        return response;
    }

}