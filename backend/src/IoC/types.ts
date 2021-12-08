export const TYPES = {
    Logger: Symbol.for("Logger"),

    IMongoDbConnector: Symbol.for("IMongoDbConnector"),
    FeedRepository: Symbol.for("FeedRepository"),

    ElMundoReader: Symbol.for("ElPaisReader"),
    ElPaisReader: Symbol.for("ElPaisReader"),

    IFeedUpdater: Symbol.for("IFeedUpdater"),
    IFeedCrudService: Symbol.for("IFeedCrudService"),

    ExpressFeedsController: Symbol.for("ExpressFeedsController"),
};