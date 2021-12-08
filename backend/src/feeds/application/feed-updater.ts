import { inject, injectable } from "inversify";
import { TYPES } from "../../IoC/types";
import { Feed } from "../domain/entities/feed";
import { ArticleReader } from "../domain/services/article-reader";
import { FeedRepository } from "../domain/services/feed-repository";
import { Logger } from "../domain/services/logger";
import { IFeedUpdater } from "./abstractions/feed-updater.interface";

@injectable()
export class FeedUpdater implements IFeedUpdater {
    private readonly articleReaders: ArticleReader[];

    constructor(
        @inject(TYPES.ElPaisReader)
        elPaisFeedReader: ArticleReader,
        @inject(TYPES.ElMundoReader)
        elMundoFeedReader: ArticleReader,
        @inject(TYPES.FeedRepository)
        private readonly feedRepository: FeedRepository,
        @inject(TYPES.Logger)
        private readonly logger: Logger,
    ) {
        this.articleReaders = [elPaisFeedReader, elMundoFeedReader];
    }

    UpdateAllFeeds(): Promise<void> {
        this.logger.LogWarning("METHOD NOT IMPLEMENTED", []);
        return Promise.resolve();
    }
    UpdateFeed(feed: Feed): Promise<void> {
        this.logger.LogWarning("METHOD NOT IMPLEMENTED", []);
        return Promise.resolve();
    }
}
