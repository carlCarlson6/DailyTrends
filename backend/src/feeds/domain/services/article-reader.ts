import { Article } from "../entities/article";

export interface ArticleReader {
    Read(): Promise<Article[]>
}
