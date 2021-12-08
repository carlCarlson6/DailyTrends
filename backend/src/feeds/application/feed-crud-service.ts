import { inject, injectable } from "inversify";
import { v4 as generateUuid } from "uuid";
import { TYPES } from "../../IoC/types";
import { Feed } from "../domain/entities/feed";
import { FeedNotFoundError } from "../domain/errors/feed-not-found-error";
import { FeedRepository } from "../domain/services/feed-repository";
import { Logger } from "../domain/services/logger";
import { IFeedCrudService } from "./abstractions/feed-crud-service.interface";
import { CreateFeedCommand } from "../domain/commands/create-feed-command";

@injectable()
export class FeedCrudService implements IFeedCrudService {
    constructor(
        @inject(TYPES.FeedRepository) 
        private readonly repository: FeedRepository,
        @inject(TYPES.Logger)
        private readonly logger: Logger,
    ) {}

    async Create(command: CreateFeedCommand): Promise<Feed> {
        const feed = Feed.CreateFromCommand(command);
        await this.repository.Save(feed);
        return feed;
    }

    async ReadAll(): Promise<Feed[]> {
        const feeds = await this.repository.ReadAll();
        return feeds;
    }

    async Read(feedId: string): Promise<Feed> {
        const feed = await this.repository.Read(feedId);
        if (!feed) {
            const feedNotFoundError = new FeedNotFoundError(feedId);
            this.logger.LogError(feedNotFoundError.message, []);
            throw feedNotFoundError;
        }
        return feed;
    }

    async Update(feed: Feed): Promise<void> {
        await this.Read(feed.id);
        await this.repository.Update(feed);
    }

    async Delete(feedId: string): Promise<void> {
        const feed = await this.Read(feedId);
        await this.repository.Delete(feed);
    }
}
