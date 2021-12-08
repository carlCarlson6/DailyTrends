import { Feed } from "../entities/feed";
import { Specification } from "../specifications/specification";

export interface FeedRepository {
    Save(feed: Feed): Promise<void>;
    
    ReadAll(): Promise<Feed[]>;

    Read(id: string): Promise<Feed|null>;
    
    Find(speficication: Specification<Feed>): Promise<Feed[]>;

    Update(feed: Feed): Promise<void>;

    Delete(feed: Feed): Promise<void>;
}
