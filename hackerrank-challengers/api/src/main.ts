import { ApiExpress } from "./infra/api/express/api.express";
import { IncreaseDownvotesFeedbackExpressRoute } from "./infra/api/express/routes/feedback/increase-downvotes-feedback.express.route";
import { IncreaseUpvotesFeedbackExpressRoute } from "./infra/api/express/routes/feedback/increase-upvotes-feedback.express.route";
import { ListFeedbackExpressRoute } from "./infra/api/express/routes/feedback/list-feedback.express.route";
import { SaveFeedbackExpressRoute } from "./infra/api/express/routes/feedback/save-feedback.express.route";
import { FeedbackRepositoryPrisma } from "./infra/repositories/feedback/feedback.repository.prisma";
import { prisma } from "./package/prisma/prisma";
import { IncreaseDownvotesUsecase } from "./usecases/feedback/increaseDownvotes/increase-downvotes.usecase";
import { IncreaseUpvotesUsecase } from "./usecases/feedback/increaseUpvotes/increase-upvotes.usecase";
import { ListFeedbackUsecase } from "./usecases/feedback/list/list-feedback.usecase";
import { SaveFeedbackUsecase } from "./usecases/feedback/save/save-feedback.usecase";

function main() {

    const aRepository = FeedbackRepositoryPrisma.create(prisma);

    const saveFeedbackUsecase = SaveFeedbackUsecase.create(aRepository);
    const listFeedbackUsecase = ListFeedbackUsecase.create(aRepository);
    const increaseUpvotesFeedbackUsecase = IncreaseUpvotesUsecase.create(aRepository);
    const increaseDownvotesFeedbackUsecase = IncreaseDownvotesUsecase.create(aRepository);

    const saveRoute = SaveFeedbackExpressRoute.create(saveFeedbackUsecase);
    const listRoute = ListFeedbackExpressRoute.create(listFeedbackUsecase);
    const increaseUpvotesRoute = IncreaseUpvotesFeedbackExpressRoute.create(
        increaseUpvotesFeedbackUsecase
    );
    const increaseDownvotesRoute = IncreaseDownvotesFeedbackExpressRoute.create(
        increaseDownvotesFeedbackUsecase
    );

    const api = ApiExpress.create([
        saveRoute,
        listRoute,
        increaseUpvotesRoute,
        increaseDownvotesRoute
    ]);
    const port = 3000;
    api.start(port);
}

main();