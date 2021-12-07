import { Feed } from "../entities/feed";

export interface FeedRepository {
    Save(feed: Feed): Promise<void>;
    
    ReadAll(): Promise<Feed[]>;

    Read(id: string): Promise<Feed|null>;
    
    Update(feed: Feed): Promise<void>;

    Delete(feed: Feed): Promise<void>;
}
