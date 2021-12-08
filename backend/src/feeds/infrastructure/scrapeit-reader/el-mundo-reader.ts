import { injectable } from "inversify";
import scrapeIt from "scrape-it";
import { Article } from "../../domain/entities/article";
import { ArticleReader } from "../../domain/services/article-reader";

@injectable()
export class ElMundoReader implements ArticleReader {
    private readonly url = "https://www.elmundo.es/";
    private readonly publisher = "El Mundo";
    
    async Read(): Promise<Article[]> {
        const articlesInFronPage = await this.ScrapeArticlesInFrontPage();
        const top5Articles = articlesInFronPage.slice(0, 5);

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
            title: article.title,
            body: mainArticleData.body[0].text,
            source: article.source,
            image: mainArticleData.image,
            publisher: this.publisher,
        };
    }

    private async ScrapeMainArticleData(article: Article): Promise<any> {
        const result = await scrapeIt<any>(article.source, {
            body: {
                listItem: "div.ue-l-article__body.ue-c-article__body",
                data: {
                    text: "p"
                }
            },
            image: {
                selector: "img",
                //selector: "img.ue-c-article__image",
                attr: "src"
            }
        });
        return result.data;
    }
}