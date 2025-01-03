import { ApiExpress } from "./infra/api/express/api.express";
import { ListArticleExpressRoute } from "./infra/api/express/routes/article/list-article.express.route";
import { SaveArticleExpressRoute } from "./infra/api/express/routes/article/save-article.express.route";
import { IncreaseDownvotesFeedbackExpressRoute } from "./infra/api/express/routes/feedback/increase-downvotes-feedback.express.route";
import { IncreaseUpvotesFeedbackExpressRoute } from "./infra/api/express/routes/feedback/increase-upvotes-feedback.express.route";
import { ListFeedbackExpressRoute } from "./infra/api/express/routes/feedback/list-feedback.express.route";
import { SaveFeedbackExpressRoute } from "./infra/api/express/routes/feedback/save-feedback.express.route";
import { ArticleRepositoryPrisma } from "./infra/repositories/article/article.repository.prisma";
import { FeedbackRepositoryPrisma } from "./infra/repositories/feedback/feedback.repository.prisma";
import { prisma } from "./package/prisma/prisma";
import { ListArticleUsecase } from "./usecases/article/list/list-article.usecase";
import { SaveArticleUsecase } from "./usecases/article/save/save-article.usecase";
import { IncreaseDownvotesUsecase } from "./usecases/feedback/increaseDownvotes/increase-downvotes.usecase";
import { IncreaseUpvotesUsecase } from "./usecases/feedback/increaseUpvotes/increase-upvotes.usecase";
import { ListFeedbackUsecase } from "./usecases/feedback/list/list-feedback.usecase";
import { SaveFeedbackUsecase } from "./usecases/feedback/save/save-feedback.usecase";

function main() {

    // Feedbacks
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


    // Articles
    const aRepositoryArticle = ArticleRepositoryPrisma.create(prisma);

    const saveArticleUsecase = SaveArticleUsecase.create(aRepositoryArticle);
    const listArticleUsecase = ListArticleUsecase.create(aRepositoryArticle);

    const saveArticleRoute = SaveArticleExpressRoute.create(saveArticleUsecase);
    const listArticleRoute = ListArticleExpressRoute.create(listArticleUsecase);

    const api = ApiExpress.create([
        // Feedbacks
        saveRoute,
        listRoute,
        increaseUpvotesRoute,
        increaseDownvotesRoute,

        // Articles
        saveArticleRoute,
        listArticleRoute
    ]);
    const port = 3003;
    api.start(port);
}

main();