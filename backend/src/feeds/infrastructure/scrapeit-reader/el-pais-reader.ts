import { inject, injectable } from "inversify";
import scrapeIt from "scrape-it";
import { TYPES } from "../../../IoC/types";
import { Article } from "../../domain/dtos/article";
import { ArticleReader } from "../../domain/services/article-reader";
import { Logger } from "../../domain/services/logger";

@injectable()
export class ElPaisReader implements ArticleReader {
    private readonly url = "https://elpais.com/";
    private readonly publisher = "El Pais";

    constructor(
        @inject(TYPES.Logger)
        private readonly logger: Logger,
    ) {}

    async Read(): Promise<Article[]> {
        this.logger.LogInfo("reading articles", [this.publisher, this.url])

        const articleInFrontPage = await this.ScrapeArticlesInFrontPage();
        const top5Articles = articleInFrontPage
            .filter(article => !article.Source.includes("editoriales"))
            .slice(0, 5);

        const enrichedArticles = await Promise.all(
            top5Articles.map(async article => this.EnrichArticleData(article))
        );
        return enrichedArticles;
    }

    private async ScrapeArticlesInFrontPage(): Promise<Article[]> {
        const result = await scrapeIt<{articles: Article[]}>(this.url, {
            articles: {
                listItem: "article",
                data: {
                    title: "h2.c_t",
                    source: {
                        selector: "a",
                        attr: "href"
                    }
                }
            }
        });
        return result.data.articles;
    }

    private async EnrichArticleData(article: Article): Promise<Article> {
        const articleWithSource = {...article, source: this.url+article.Source};
        const mainArticleData = await this.ScrapeMainArticleData(articleWithSource);

        return {
            Title: articleWithSource.Title,
            Body: mainArticleData.body,
            Source: articleWithSource.Source,
            Image: mainArticleData.image,
            Publisher: this.publisher
        };
    }

    private async ScrapeMainArticleData(article: Article): Promise<{body: string, image: string}> {
        const result = await scrapeIt<{body: string, image: string}>(article.Source, {
            body: "div.a_c.clearfix",
            image: {
                selector: "img",
                attr: "src"
            }
        });
        return result.data;
    }
}
