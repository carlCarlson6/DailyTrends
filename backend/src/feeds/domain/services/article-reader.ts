import { Article } from "../dtos/article";

export interface ArticleReader {
    Read(): Promise<Article[]>
}
