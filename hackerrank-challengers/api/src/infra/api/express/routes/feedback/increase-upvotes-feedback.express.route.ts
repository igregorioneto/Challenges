import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { IncreaseUpvotesInputDto, IncreaseUpvotesUsecase } from "../../../../../usecases/feedback/increaseUpvotes/increase-upvotes.usecase";

export class IncreaseUpvotesFeedbackExpressRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly mathod: HttpMethod,
        private readonly increaseUpvotesService: IncreaseUpvotesUsecase
    ) {}

    public static create(increaseUpvotesService: IncreaseUpvotesUsecase) {
        return new IncreaseUpvotesFeedbackExpressRoute(
            "/feedbacks/upvotes/:id",
            HttpMethod.POST,
            increaseUpvotesService
        );
    }

    getHandler() {
        return async (request: Request, response: Response) => {
            const { id } = request.params;
            try {
                if (!id) {
                    response.status(404).json({ message: 'ID params not found', success: false });
                }

                const input: IncreaseUpvotesInputDto = {
                    id
                }

                await this.increaseUpvotesService.execute(input);
                
                response
                    .status(200)
                    .json({ message: 'Increase Upvotes successfully', success: true });
            } catch (error: unknown) {
                if (error instanceof Error) {
                    response
                        .status(500)
                        .json({ message: error.message, success: false });
                } else {
                    response
                        .status(500)
                        .json({ message: 'An unknown error occurred', success: false });
                }
            }
        }
    }

    getPath(): string {
        return this.path;
    }

    getMethod(): HttpMethod {
        return this.mathod;
    }
    
}