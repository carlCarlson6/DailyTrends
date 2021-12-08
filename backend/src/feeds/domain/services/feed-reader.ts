import { Article } from "../entities/article";

export interface FeedReader {
    Read(): Promise<Article[]>
}
