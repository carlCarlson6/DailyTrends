import { Article } from "./article";
import { v4 as generateUuid } from "uuid";
import { CreateFeedCommand } from "../commands/create-feed-command";

export class Feed {
    constructor(    
        readonly id: string,
        readonly title: string,
        readonly body: string,
        readonly image: string,
        readonly source: string,
        readonly publisher: string,
        readonly date: Date,
    ) { }

    static CreateFromArticle(article: Article): Feed {
        return new Feed(
            generateUuid(),
            article.title,
            article.body,
            article.image,
            article.source,
            article.publisher,
            new Date()
        )
    }

    static CreateFromCommand(command: CreateFeedCommand): Feed {
        return new Feed(
            generateUuid(), 
            command.title, 
            command.body, 
            command.image, 
            command.source, 
            command.publisher, 
            new Date()
        );
    }
}
