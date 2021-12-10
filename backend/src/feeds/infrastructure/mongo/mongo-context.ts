import { Collection } from "mongodb";
import { FeedModel } from "./feed-model";

export interface MongoContext {
    feeds: Collection<FeedModel>
}
