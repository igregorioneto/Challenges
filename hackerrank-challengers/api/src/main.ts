import { ApiExpress } from "./infra/api/express/api.express";
import { ListArticleExpressRoute } from "./infra/api/express/routes/article/list-article.express.route";
import { SaveArticleExpressRoute } from "./infra/api/express/routes/article/save-article.express.route";
import { ListContactExpressRoute } from "./infra/api/express/routes/contact/list-contact.express.route";
import { SaveContactExpressRoute } from "./infra/api/express/routes/contact/save-contact.express.route";
import { IncreaseDownvotesFeedbackExpressRoute } from "./infra/api/express/routes/feedback/increase-downvotes-feedback.express.route";
import { IncreaseUpvotesFeedbackExpressRoute } from "./infra/api/express/routes/feedback/increase-upvotes-feedback.express.route";
import { ListFeedbackExpressRoute } from "./infra/api/express/routes/feedback/list-feedback.express.route";
import { SaveFeedbackExpressRoute } from "./infra/api/express/routes/feedback/save-feedback.express.route";
import { MenuListExpressRoute } from "./infra/api/express/routes/menu/menu-list.express.route";
import { MenuSaveExpressRoute } from "./infra/api/express/routes/menu/menu-save.express.route";
import { ArticleRepositoryPrisma } from "./infra/repositories/article/article.repository.prisma";
import { ContactRepositoryPrisma } from "./infra/repositories/contact/contact.repository.prisma";
import { FeedbackRepositoryPrisma } from "./infra/repositories/feedback/feedback.repository.prisma";
import { MenuRepositoryPrisma } from "./infra/repositories/menu/menu.repository.prispa";
import { prisma } from "./package/prisma/prisma";
import { ListArticleUsecase } from "./usecases/article/list/list-article.usecase";
import { SaveArticleUsecase } from "./usecases/article/save/save-article.usecase";
import { ListContactUsecase } from "./usecases/contact/list/list-contact.usecase";
import { SaveContactUsecase } from "./usecases/contact/save/save-contact.usecase";
import { IncreaseDownvotesUsecase } from "./usecases/feedback/increaseDownvotes/increase-downvotes.usecase";
import { IncreaseUpvotesUsecase } from "./usecases/feedback/increaseUpvotes/increase-upvotes.usecase";
import { ListFeedbackUsecase } from "./usecases/feedback/list/list-feedback.usecase";
import { SaveFeedbackUsecase } from "./usecases/feedback/save/save-feedback.usecase";
import { MenuListUsecase } from "./usecases/menu/list/menu-list.usecase";
import { MenuSaveUsecase } from "./usecases/menu/save/menu-save.usecase";

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


    // Contacts
    const aRepositoryContact = ContactRepositoryPrisma.create(prisma);
    
    const saveContactUsecase = SaveContactUsecase.create(aRepositoryContact);
    const listContactUsecase = ListContactUsecase.create(aRepositoryContact);

    const saveContactRoute = SaveContactExpressRoute.create(saveContactUsecase);
    const listContactRoute = ListContactExpressRoute.create(listContactUsecase);


    // Menu
    const aRepositoryMenu = MenuRepositoryPrisma.create(prisma);

    const saveMenuUsecase = MenuSaveUsecase.create(aRepositoryMenu);
    const listMenuUsecase = MenuListUsecase.create(aRepositoryMenu);

    const saveMenuRoute = MenuSaveExpressRoute.create(saveMenuUsecase);
    const listMenuRoute = MenuListExpressRoute.create(listMenuUsecase);

    const api = ApiExpress.create([
        // Feedbacks
        saveRoute,
        listRoute,
        increaseUpvotesRoute,
        increaseDownvotesRoute,

        // Articles
        saveArticleRoute,
        listArticleRoute,

        // Contacts
        saveContactRoute,
        listContactRoute,

        // Menu
        saveMenuRoute,
        listMenuRoute
    ]);
    const port = Number(process.env.PORT) || 3002;
    api.start(port);
}

main();