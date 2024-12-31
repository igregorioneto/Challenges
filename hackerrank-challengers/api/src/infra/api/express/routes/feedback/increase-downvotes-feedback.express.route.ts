import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { IncreaseDownvotesInputDto, IncreaseDownvotesUsecase } from "../../../../../usecases/feedback/increaseDownvotes/increase-downvotes.usecase";

export class IncreaseDownvotesFeedbackExpressRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly increaseDownvotsService: IncreaseDownvotesUsecase
    ) {}

    public static create(increaseDownvotsService: IncreaseDownvotesUsecase) {
        return new IncreaseDownvotesFeedbackExpressRoute(
            "/feedbacks/downvotes/:id",
            HttpMethod.POST,
            increaseDownvotsService
        );
    }

    getHandler(){
        return async (request: Request, response: Response) => {
            const { id } = request.params;
            try {
                if (!id) {
                    response.status(404).json({ message: 'ID params not found', status: false });
                }

                const input: IncreaseDownvotesInputDto = {
                    id
                }

                await this.increaseDownvotsService.execute(input);

                response
                    .status(200)
                    .json({ message: 'Increase Downvotes successfully', status: true })
                    .send();
            } catch (error: unknown) {
                if (error instanceof Error) {
                    response
                        .status(500)
                        .json({ message: error.message, status: false });
                } else {
                    response
                        .status(500)
                        .json({ message: 'An unknown error occurred', status: false });
                }
            }
        }
    }
    getPath(): string {
        return this.path;
    }
    getMethod(): HttpMethod {
        return this.method;
    }
    
}