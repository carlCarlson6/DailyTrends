import scrapeIt from "scrape-it";
import { Article } from "../../domain/entities/article";
import { FeedReader } from "../../domain/services/feed-reader";

export class ElMundoReader implements FeedReader {
    private readonly url = "https://www.elmundo.es/";
    private readonly publisher = "El Mundo";
    
    async Read(): Promise<Article[]> {
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

        const top5Articles = result.data.articles.slice(0, 5);
        const enrichedArticles = await Promise.all(
            top5Articles.map(async article => this.EnrichArticleData(article))
        );

        return enrichedArticles;
    }

    private async EnrichArticleData(article: Article): Promise<Article> {
        const result = await scrapeIt<any>(article.source, {
            body: {
                listItem: "div.ue-l-article__body.ue-c-article__body",
                data: {
                    text: "p"
                }
            },
            image: {
                selector: "img.ue-c-article__image",
                attr: "src"
            }
        });

        console.log(result.data.body[0]);

        return {
            title: article.title,
            body: result.data.body[0].text,
            source: article.source,
            image: result.data.image,
            publisher: this.publisher,
        };
    }

}