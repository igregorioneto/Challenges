import { ApiExpress } from "./infra/api/express/api.express";
import { ListFeedbackExpressRoute } from "./infra/api/express/routes/feedback/list-feedback.express.route";
import { SaveFeedbackExpressRoute } from "./infra/api/express/routes/feedback/save-feedback.express.route";
import { FeedbackRepositoryPrisma } from "./infra/repositories/feedback/feedback.repository.prisma";
import { prisma } from "./package/prisma/prisma";
import { ListFeedbackUsecase } from "./usecases/feedback/list/list-feedback.usecase";
import { SaveFeedbackUsecase } from "./usecases/feedback/save/save-feedback.usecase";

function main() {

    const aRepository = FeedbackRepositoryPrisma.create(prisma);

    const saveFeedbackUsecase = SaveFeedbackUsecase.create(aRepository);
    const listFeedbackUsecase = ListFeedbackUsecase.create(aRepository);

    const saveRoute = SaveFeedbackExpressRoute.create(saveFeedbackUsecase);
    const listRoute = ListFeedbackExpressRoute.create(listFeedbackUsecase);

    const api = ApiExpress.create([
        saveRoute,
        listRoute
    ]);
    const port = 3000;
    api.start(port);
}

main();