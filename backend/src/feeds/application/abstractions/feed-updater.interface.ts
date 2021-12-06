import { Feed } from "../../domain/entities/feed";

export interface IFeedUpdater {
    UpdateAllFeeds(): Promise<void>;
    UpdateFeed(feed: Feed): Promise<void>;
}
