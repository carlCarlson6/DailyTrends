export const TYPES = {
    Logger: Symbol.for("Logger"),

    IMongoDbConnector: Symbol.for("IMongoDbConnector"),
    FeedRepository: Symbol.for("FeedRepository"),

    ElMundoFeedReader: Symbol.for("ElMundoFeedReader"),
    ElPaisFeedReader: Symbol.for("ElPaisFeedReader"),

    IFeedUpdater: Symbol.for("IFeedUpdater"),
    IFeedCrudService: Symbol.for("IFeedCrudService"),

    ExpressFeedsController: Symbol.for("ExpressFeedsController"),
};