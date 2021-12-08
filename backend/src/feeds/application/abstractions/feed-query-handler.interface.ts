import { Feed } from "../../domain/entities/feed";
import { DomainQuery } from "../../domain/queries/domain-query";

export interface IFeedQueryHandler {
    Handle(query: DomainQuery): Promise<Feed[]>;
}
