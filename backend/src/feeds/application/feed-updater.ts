import { inject, injectable } from "inversify";
import { TYPES } from "../../IoC/types";
import { Feed } from "../domain/entities/feed";
import { FeedReader } from "../domain/services/feed-reader";
import { FeedRepository } from "../domain/services/feed-repository";
import { Logger } from "../domain/services/logger";
import { IFeedUpdater } from "./abstractions/feed-updater.interface";

@injectable()
export class FeedUpdater implements IFeedUpdater {
    constructor(
        @inject(TYPES.FeedReader)
        private readonly feedReader: FeedReader,
        @inject(TYPES.FeedRepository)
        private readonly feedRepository: FeedRepository,
        @inject(TYPES.Logger)
        private readonly logger: Logger,
    ) {}

    UpdateAllFeeds(): Promise<void> {
        this.logger.LogWarning("METHOD NOT IMPLEMENTED", []);
        return Promise.resolve();
    }
    UpdateFeed(feed: Feed): Promise<void> {
        this.logger.LogWarning("METHOD NOT IMPLEMENTED", []);
        return Promise.resolve();
    }
}
