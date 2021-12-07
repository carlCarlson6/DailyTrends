import { inject, injectable } from "inversify";
import { TYPES } from "../../../IoC/types";
import { Feed } from "../../domain/entities/feed";
import { FeedRepository } from "../../domain/services/feed-repository";
import { Logger } from "../../domain/services/logger";
import { IMongoDbConnector } from "./mongo-connector";

@injectable()
export class MongoFeedRepository implements FeedRepository {
    constructor(
        @inject(TYPES.IMongoDbConnector)
        private readonly dbConnector: IMongoDbConnector,
        @inject(TYPES.Logger)
        private readonly logger: Logger,
    ) {}

    async Save(feed: Feed): Promise<void> {
        const context = await this.dbConnector.Connect();

        this.logger.LogInfo("inserting a new feed on db", [JSON.stringify({feed})]);
        const insertResult = await context.feeds.insertOne(feed);

        if (!insertResult.acknowledged) {
            const errorMessage = `insert transaction failed of feed ${feed}`;
            this.logger.LogError(errorMessage, [JSON.stringify({feed})]);
        }
    }

    async ReadAll(): Promise<Feed[]> {
        const context = await this.dbConnector.Connect();
        const feeds = await context.feeds.find({}).toArray();
        return feeds;
    }

    async Read(id: string): Promise<Feed|null> {
        const context = await this.dbConnector.Connect();
        const feed = await context.feeds.findOne({ id })
        return feed;
    }
    
    async Update(feed: Feed): Promise<void> {
        const context = await this.dbConnector.Connect();
        
        this.logger.LogWarning(`updating feed from mongo db`, [JSON.stringify({feed})]);
        const updateResult = await context.feeds.updateOne({ id: feed.id }, { $set: feed });

        if (!updateResult.acknowledged && updateResult.matchedCount !== 1 && updateResult.modifiedCount !== 1 && updateResult.upsertedCount !== 1) {
            const errorMessage = `update transaction was not completed correctly of feed ${feed}`;
            this.logger.LogError(errorMessage, [JSON.stringify({feed})]);
            throw new Error(errorMessage);
        }
    }

    async Delete(feed: Feed): Promise<void> {
        const context = await this.dbConnector.Connect();

        this.logger.LogWarning("deleting feed from mongo db", [JSON.stringify({feed})])
        var deleteResult = await context.feeds.deleteOne({ id: feed.id });
        
        if(!deleteResult.acknowledged && deleteResult.deletedCount !== 1) {
            const errorMessage = `could not delete feed ${feed}`;
            this.logger.LogError(errorMessage, [JSON.stringify({feed})]);
            throw new Error(errorMessage);
        }
    }
}
