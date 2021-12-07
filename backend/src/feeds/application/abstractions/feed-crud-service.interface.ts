import { Feed } from "../../domain/entities/feed";
import { CreateFeedCommand } from "../messages/create-feed-command";

export interface IFeedCrudService {
    Create(command: CreateFeedCommand): Promise<Feed>;
    ReadAll(): Promise<Feed[]>;
    Read(feedId: string): Promise<Feed>;
    Update(feed: Feed): Promise<void>;
    Delete(feedId: string): Promise<void>;
}
