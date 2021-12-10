import { inject, injectable } from "inversify";
import { TYPES } from "../../../IoC/types";
import { Feed } from "../../domain/entities/feed";
import { RepositoryTransactionError } from "../../domain/errors/repository-transaction-error";
import { FeedRepository } from "../../domain/services/feed-repository";
import { Logger } from "../../domain/services/logger";
import { Specification } from "../../domain/specifications/specification";
import { intoDomainFeed, intoFeedModel } from "./feed-model";
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
        const insertResult = await context.feeds.insertOne(intoFeedModel(feed));

        if (!insertResult.acknowledged) {
            this.LogAndThrowError(`insert transaction failed of feed ${feed}`, [JSON.stringify({feed})]);
        }
    }

    async ReadAll(): Promise<Feed[]> {
        const context = await this.dbConnector.Connect();
        const feeds = await context.feeds.find({}).toArray();
        return feeds.map(f => intoDomainFeed(f));
    }

    async Read(id: string): Promise<Feed|null> {
        const context = await this.dbConnector.Connect();
        const feed = await context.feeds.findOne({ id })
        return !feed? null : intoDomainFeed(feed);
    }

    async Find(speficication: Specification<Feed>): Promise<Feed[]> {
        const context = await this.dbConnector.Connect();
        const feedModels = await context.feeds.find({}).toArray();
        const feeds = feedModels.map(f => intoDomainFeed(f));

        const feedsBySpaceification = feeds.filter(feed => speficication.ToExpression()(feed));
        return feedsBySpaceification;
    }
    
    async Update(feed: Feed): Promise<void> {
        const context = await this.dbConnector.Connect();
        
        this.logger.LogWarning(`updating feed from mongo db`, [JSON.stringify({feed})]);
        const updateResult = await context.feeds.updateOne({ id: feed.id }, { $set: intoFeedModel(feed) });

        if (!updateResult.acknowledged && updateResult.matchedCount !== 1 && updateResult.modifiedCount !== 1 && updateResult.upsertedCount !== 1) {
            this.LogAndThrowError(`update transaction was not completed correctly of feed ${feed}`, [JSON.stringify({feed})]);
        }
    }

    async Delete(feed: Feed): Promise<void> {
        const context = await this.dbConnector.Connect();

        this.logger.LogWarning("deleting feed from mongo db", [JSON.stringify({feed})])
        var deleteResult = await context.feeds.deleteOne({ id: feed.id });
        
        if(!deleteResult.acknowledged && deleteResult.deletedCount !== 1) {
            this.LogAndThrowError(`could not delete feed ${feed}`, [JSON.stringify({feed})]);
        }
    }

    private LogAndThrowError(errorMessage: string, parameters: string[]): void {
        this.logger.LogError(errorMessage, parameters);
        throw new RepositoryTransactionError(errorMessage);
    }
}
