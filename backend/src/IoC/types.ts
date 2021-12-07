export const TYPES = {
    Logger: Symbol.for("Logger"),

    IMongoDbConnector: Symbol.for("IMongoDbConnector"),
    FeedRepository: Symbol.for("FeedRepository"),

    FeedReader: Symbol.for("FeedReader"),

    IFeedUpdater: Symbol.for("IFeedUpdater"),
    IFeedCrudService: Symbol.for("IFeedCrudService"),

    ExpressFeedsController: Symbol.for("ExpressFeedsController"),
};