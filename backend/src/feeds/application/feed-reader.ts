import { inject, injectable } from "inversify";
import { TYPES } from "../../IoC/types";
import { Article } from "../domain/entities/article";
import { Feed } from "../domain/entities/feed";
import { ArticleReader } from "../domain/services/article-reader";
import { FeedRepository } from "../domain/services/feed-repository";
import { Logger } from "../domain/services/logger";
import { IFeedReader } from "./abstractions/feed-reader.interface";
import { v4 as generateUuid } from "uuid";

@injectable()
export class FeedReader implements IFeedReader {
    private readonly articleReaders: ArticleReader[];

    constructor(
        @inject(TYPES.ElPaisReader)
        elPaisFeedReader: ArticleReader,
        @inject(TYPES.ElMundoReader)
        elMundoFeedReader: ArticleReader,
        @inject(TYPES.FeedRepository)
        private readonly feedRepository: FeedRepository,
        @inject(TYPES.Logger)
        private readonly logger: Logger,
    ) {
        this.articleReaders = [elPaisFeedReader, elMundoFeedReader];
    }

    async Execute(): Promise<void> {
        this.logger.LogInfo("retrieving already saved sources", []);
        const sources = await this.GetAllSavedSouces();
        
        this.logger.LogInfo("getting articles to save", []);
        const articlesToAdd = await this.GetArticlesToAdd(sources);
        if(articlesToAdd.length == 0) {
            this.logger.LogInfo("there are no new article to save", []);
            return;
        }

        this.logger.LogInfo("saving articles", []);
        await this.SaveArticles(articlesToAdd);
    }

    private async GetAllSavedSouces(): Promise<string[]> {
        const allFeeds = await this.feedRepository.ReadAll();
        return allFeeds.map(feed => feed.source);
    }

    private async GetArticlesToAdd(alreadySavedSources: string[]): Promise<Article[]> {
        const articles = (await Promise.all(this.articleReaders.map(reader => reader.Read()))).flat()
        return articles.filter(article => alreadySavedSources.every(source => source !== article.source));
    }

    private async SaveArticles(articles: Article[]): Promise<void> {
        const feedsToSave = articles.map(article => Feed.CreateFromArticle(article));

        await Promise.all(feedsToSave.map(feed => this.feedRepository.Save(feed)));
    }
}
