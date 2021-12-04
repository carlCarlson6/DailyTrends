import { Collection } from "mongodb";
import { Feed } from "../../domain/entities/feed";

export interface MongoContext {
    feeds: Collection<Feed>
}
