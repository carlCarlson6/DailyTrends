import { Feed } from "../../domain/entities/feed";
import { FeedRepository } from "../../domain/services/feed-repository";
import { MongoDbConnector } from "./mongo-connector";

export class MongoFeedRepository implements FeedRepository {
    constructor(
        private readonly dbConnector: MongoDbConnector
    ) {}

    async Save(feed: Feed): Promise<void> {
        const context = await this.dbConnector();
        const feeds = await context.feeds.insertOne(feed);
    }

    async ReadAll(): Promise<Feed[]> {
        const context = await this.dbConnector();
        const feeds = await context.feeds.find({}).toArray();
        return feeds;
    }

    async Read(id: string): Promise<Feed|undefined> {
        const context = await this.dbConnector();
        const feed = await context.feeds.findOne({ id })
        return feed? feed : undefined;
    }
    
    async Update(feed: Feed): Promise<void> {
        const context = await this.dbConnector();
        await context.feeds.updateOne({ id: feed.id }, feed );
    }

    async Delete(feed: Feed): Promise<void> {
        const context = await this.dbConnector();
        await context.feeds.deleteOne({ id: feed.id });
    }
}
