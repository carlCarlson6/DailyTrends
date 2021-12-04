import { v4 as generateUuid } from "uuid";
import { Feed } from "../domain/entities/feed";
import { FeedNotFoundError } from "../domain/errors/feed-not-found-error";
import { FeedRepository } from "../domain/services/feed-repository";
import { Logger } from "../domain/services/logger";
import { CreateFeedCommand } from "./messages/create-feed-command";

export class CRUDFeed {
    constructor(
        private readonly repository: FeedRepository,
        private readonly logger: Logger,
    ) {}

    async Create(command: CreateFeedCommand): Promise<Feed> {
        const { title, body, image, source, publisher } = command;
        const id = generateUuid();
        const feed = new Feed(id, title, body, image, source, publisher);

        await this.repository.Save(feed);

        return feed;
    }

    async ReadAll(): Promise<Feed[]> {
        const feeds = await this.repository.ReadAll();
        return feeds;
    }

    async Read(id: string): Promise<Feed> {
        const feed = await this.repository.Read(id);
        if (!feed) {
            throw new FeedNotFoundError(id);
        }
        return feed;
    }

    async Update(feed: Feed): Promise<void> {
        await this.Read(feed.id);
        await this.repository.Update(feed);
    }

    async Delete(id: string): Promise<void> {
        const feed = await this.Read(id);
        await this.repository.Update(feed);
    }
}
