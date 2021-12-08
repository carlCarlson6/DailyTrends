import { injectable } from "inversify";
import { Article } from "../../domain/entities/article";
import { Feed } from "../../domain/entities/feed";
import { FeedReader } from "../../domain/services/feed-reader";

@injectable()
export class WebScrapper implements FeedReader {
    Read(): Promise<Feed[]> {
        throw new Error("Method not implemented.");
    }

    ReadFeed(feed: Feed): Promise<Article[]> {
        throw new Error("Method not implemented.");
    }
}
