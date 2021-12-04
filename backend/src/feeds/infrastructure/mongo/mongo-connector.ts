import { MongoClient } from "mongodb";
import { Feed } from "../../domain/entities/feed";
import { config as readEnvConfig } from "dotenv";
import { MongoContext } from "./mongo-context";

export type MongoDbConnector = () => Promise<MongoContext>;

export const connectToMongo: MongoDbConnector = async () => {
    readEnvConfig();

    const client = new MongoClient(process.env.MONGO_CONNECTION_STRING!);
            
    await client.connect();
        
    const db = client.db(process.env.MONGO_DAILYTRENDS_DB!);
    const feedsCollection = db.collection<Feed>(process.env.MONGO_FEEDS_COLLECTION_NAME!);

    return {
        feeds: feedsCollection
    };
};
