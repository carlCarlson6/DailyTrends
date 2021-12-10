import { MongoClient } from "mongodb";
import { Feed } from "../../domain/entities/feed";
import { config as readEnvConfig } from "dotenv";
import { MongoContext } from "./mongo-context";
import { injectable } from "inversify";
import { FeedModel } from "./feed-model";

export interface IMongoDbConnector {
    Connect(): Promise<MongoContext>;
    TestConnection(): Promise<void>;
}

@injectable()
export class MongoDbConnector implements IMongoDbConnector {
    async TestConnection(): Promise<void> {
        readEnvConfig();
        const client = new MongoClient(process.env.MONGO_CONNECTION_STRING!);
        await client.connect();
        await client.close();
    }

    async Connect(): Promise<MongoContext> {
        readEnvConfig();

        const client = new MongoClient(process.env.MONGO_CONNECTION_STRING!);
        await client.connect();
            
        const db = client.db(process.env.MONGO_DAILYTRENDS_DB!);
        const feedsCollection = db.collection<FeedModel>(process.env.MONGO_FEEDS_COLLECTION_NAME!);
    
        return {
            feeds: feedsCollection
        };
    }
}
