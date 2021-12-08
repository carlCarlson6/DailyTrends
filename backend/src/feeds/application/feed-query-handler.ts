import { inject, injectable } from "inversify";
import { TYPES } from "../../IoC/types";
import { Feed } from "../domain/entities/feed";
import { QueryNotImplemented } from "../domain/errors/query-not-implemented-error";
import { DomainQuery } from "../domain/queries/domain-query";
import { FeedsByDateQuery } from "../domain/queries/feeds-by-date-query";
import { FeedRepository } from "../domain/services/feed-repository";
import { Logger } from "../domain/services/logger";
import { FeedsByDateSpecification } from "../domain/specifications/feeds-by-date-specification";
import { IFeedQueryHandler } from "./abstractions/feed-query-handler.interface";

@injectable()
export class FeedQueryHandler implements IFeedQueryHandler {
    constructor(
        @inject(TYPES.FeedRepository)
        private readonly feedRepository: FeedRepository,
        @inject(TYPES.Logger)
        private readonly logger: Logger,
    ) {}

    async Handle(query: DomainQuery): Promise<Feed[]> {
        if(!(query instanceof FeedsByDateQuery)) {
            throw new QueryNotImplemented();
        }

        const queryFeedsByDate = query as FeedsByDateQuery;
        const feeds = await this.feedRepository.Find(new FeedsByDateSpecification(queryFeedsByDate.Date));
        return feeds;
    }
}
