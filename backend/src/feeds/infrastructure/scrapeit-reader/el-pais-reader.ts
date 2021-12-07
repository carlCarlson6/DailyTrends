import scrapeIt from "scrape-it";
import { Article } from "../../domain/entities/article";
import { FeedReader } from "../../domain/services/feed-reader";

export class ElPaisReader implements FeedReader {
    private readonly url = "https://elpais.com/";
    private readonly publisher = "El Pais";

    async Read(): Promise<Article[]> {
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

        const top5Articles = result.data.articles.slice(0, 5);
        const enrichedArticles = await Promise.all(
            top5Articles.map(async article => this.EnrichArticleData(article))
        );

        return enrichedArticles;
    }

    private async EnrichArticleData(article: Article): Promise<Article> {
        const articleWithSource = {...article, source: this.url+article.source};
        const result = await scrapeIt<any>(articleWithSource.source, {
            body: "h2.a_st",
            image: {
                selector: "img",
                attr: "src"
            }
        });

        return {
            title: articleWithSource.title,
            body: result.data.body,
            source: articleWithSource.source,
            image: result.data.image,
            publisher: this.publisher
        };
    }
}