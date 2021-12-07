import { injectable } from "inversify";
import scrapeIt from "scrape-it";
import { Article } from "../../domain/entities/article";
import { FeedReader } from "../../domain/services/feed-reader";

@injectable()
export class ElPaisReader implements FeedReader {
    private readonly url = "https://elpais.com/";
    private readonly publisher = "El Pais";

    async Read(): Promise<Article[]> {
        const articleInFrontPage = await this.ScrapeArticlesInFrontPage();
        const top5Articles = articleInFrontPage
            .filter(article => !article.source.includes("editoriales"))
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
        const articleWithSource = {...article, source: this.url+article.source};
        const mainArticleData = await this.ScrapeMainArticleData(articleWithSource);

        return {
            title: articleWithSource.title,
            body: mainArticleData.body,
            source: articleWithSource.source,
            image: mainArticleData.image,
            publisher: this.publisher
        };
    }

    private async ScrapeMainArticleData(article: Article): Promise<{body: string, image: string}> {
        const result = await scrapeIt<{body: string, image: string}>(article.source, {
            body: "div.a_c.clearfix",
            image: {
                selector: "img",
                attr: "src"
            }
        });
        return result.data;
    }
}
