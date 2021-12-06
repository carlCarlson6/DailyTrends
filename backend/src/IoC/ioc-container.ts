import "reflect-metadata";
import { Container } from "inversify";
import { IFeedCrudService } from "../feeds/application/abstractions/feed-crud-service.interface";
import { IFeedUpdater } from "../feeds/application/abstractions/feed-updater.interface";
import { FeedCrudService } from "../feeds/application/feed-crud-service";
import { FeedUpdater } from "../feeds/application/feed-updater";
import { FeedRepository } from "../feeds/domain/services/feed-repository";
import { Logger } from "../feeds/domain/services/logger";
import { ConsoleLogger } from "../feeds/infrastructure/console-logger";
import { IMongoDbConnector, MongoDbConnector } from "../feeds/infrastructure/mongo/mongo-connector";
import { MongoFeedRepository } from "../feeds/infrastructure/mongo/mongo-feed-repository";
import { TYPES } from "./types";
import { FeedReader } from "../feeds/domain/services/feed-reader";
import { WebScrapper } from "../feeds/infrastructure/web-scrapper";
import { ExpressFeedsController } from "../apps/api/express-feeds-controller";

type addDependencies = (container: Container) => Container;

const addLogger: addDependencies = (container: Container) => {
    container.bind<Logger>(TYPES.Logger).to(ConsoleLogger);
    return container;
}

const addRepositories: addDependencies = (container: Container) => {
    container.bind<IMongoDbConnector>(TYPES.IMongoDbConnector).to(MongoDbConnector);
    container.bind<FeedRepository>(TYPES.FeedRepository).to(MongoFeedRepository);
    return container;
}

const addDomainServices: addDependencies = (container: Container) => {
    container.bind<FeedReader>(TYPES.FeedReader).to(WebScrapper)
    return container;
}

const addApplicationServices: addDependencies = (container: Container) => {
    container.bind<IFeedUpdater>(TYPES.IFeedUpdater).to(FeedUpdater);
    container.bind<IFeedCrudService>(TYPES.IFeedCrudService).to(FeedCrudService);
    return container;
}

const addControllers: addDependencies = (container: Container) => {
    container.bind<ExpressFeedsController>(TYPES.ExpressFeedsController).to(ExpressFeedsController);
    return container;
}

const buildInversionOfControlContainer = (): Container => {
    let container = new Container();
    container = addLogger(container);
    container = addRepositories(container);
    container = addDomainServices(container);
    container = addApplicationServices(container);
    container = addControllers(container);
    return container;
}

export const container = buildInversionOfControlContainer();