import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { ListFeedbackUsecase } from "../../../../../usecases/feedback/list/list-feedback.usecase";

export type ListFeedbackResponseDto = {
    feedbacks: {
        id: string;
        title: string;
        upvotes: number;
        downvotes: number;
    }[];
}

export class ListFeedbackExpressRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listFeedbackService: ListFeedbackUsecase
    ) {}

    public static create(listFeedbackService: ListFeedbackUsecase) {
        return new ListFeedbackExpressRoute(
            "/feedbacks",
            HttpMethod.GET,
            listFeedbackService
        );
    }

    getHandler() {
        return async (request: Request, response: Response) => {
            const output = await this.listFeedbackService.execute();

            const responseBody = this.present(output);

            response.status(200).json(responseBody);
        }
    }

    getPath(): string {
        return this.path;
    }

    getMethod(): HttpMethod {
        return this.method;
    }

    private present(input: ListFeedbackResponseDto): ListFeedbackResponseDto {
        const response: ListFeedbackResponseDto = {
            feedbacks: input.feedbacks.map((feedback) => ({
                id: feedback.id,
                title: feedback.title,
                upvotes: feedback.upvotes,
                downvotes: feedback.downvotes
            }))
        }
        return response;
    }
    
}