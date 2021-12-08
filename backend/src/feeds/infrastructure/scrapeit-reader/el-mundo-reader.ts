import { inject, injectable } from "inversify";
import scrapeIt from "scrape-it";
import { TYPES } from "../../../IoC/types";
import { Article } from "../../domain/dtos/article";
import { ArticleReader } from "../../domain/services/article-reader";
import { Logger } from "../../domain/services/logger";

@injectable()
export class ElMundoReader implements ArticleReader {
    private readonly url = "https://www.elmundo.es/";
    private readonly publisher = "El Mundo";
    
    constructor(
        @inject(TYPES.Logger)
        private readonly logger: Logger,
    ) {}

    async Read(): Promise<Article[]> {
        this.logger.LogInfo("reading articles", [this.publisher, this.url])

        const articlesInFronPage = await this.ScrapeArticlesInFrontPage();
        const top5Articles = articlesInFronPage.slice(0, 5);

        const enrichedArticles = await Promise.all(
            top5Articles.map(async article => this.EnrichArticleData({
                Title: article.title,
                Source: article.source,
                Publisher: this.publisher,
                Body: "",
                Image: ""
            }))
        );
        return enrichedArticles;
    }

    private async ScrapeArticlesInFrontPage(): Promise<{title: string, source: string}[]> {
        const result = await scrapeIt<{articles: {title: string, source: string}[]}>(this.url, {
            articles: {
                listItem: "article",
                data: {
                    title: "h2.ue-c-cover-content__headline",
                    source: {
                        selector: "a.ue-c-cover-content__link",
                        attr: "href"
                    }
                }
            }
        });
        return result.data.articles;
    }

    private async EnrichArticleData(article: Article): Promise<Article> {
        const mainArticleData = await this.ScrapeMainArticleData(article);
        return {
            Title: article.Title,
            Body: mainArticleData.body[0].text,
            Source: article.Source,
            Image: mainArticleData.image,
            Publisher: this.publisher,
        };
    }

    private async ScrapeMainArticleData(article: Article): Promise<any> {
        const result = await scrapeIt<any>(article.Source, {
            body: {
                listItem: "div.ue-l-article__body.ue-c-article__body",
                data: {
                    text: "p"
                }
            },
            image: {
                selector: "img",
                attr: "src"
            }
        });
        return result.data;
    }
}
