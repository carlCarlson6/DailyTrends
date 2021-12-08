export const TYPES = {
    Logger: Symbol.for("Logger"),

    IMongoDbConnector: Symbol.for("IMongoDbConnector"),
    FeedRepository: Symbol.for("FeedRepository"),

    ElMundoReader: Symbol.for("ElMundoReader"),
    ElPaisReader: Symbol.for("ElPaisReader"),

    IFeedReader: Symbol.for("IFeedReader"),
    IFeedCrudService: Symbol.for("IFeedCrudService"),

    ExpressFeedsController: Symbol.for("ExpressFeedsController"),
};