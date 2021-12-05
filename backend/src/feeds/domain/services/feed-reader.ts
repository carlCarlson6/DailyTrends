import { Article } from "../entities/article";
import { Feed } from "../entities/feed";

export interface FeedReader {
    Read(feed: Feed): Promise<Article[]>;
}
