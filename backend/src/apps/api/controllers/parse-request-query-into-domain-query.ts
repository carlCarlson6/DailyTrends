import { Request } from "express";
import { DomainQuery } from "../../../feeds/domain/queries/domain-query";
import { FeedsByDateQuery } from "../../../feeds/domain/queries/feeds-by-date-query";

export const ParseRequestQueryIntoDomainQuery = (request: Request): DomainQuery|null => {
    const requestQuery = request.query;
    
    const dateQueryString = requestQuery.date;
    if (!dateQueryString) {
        return null!;
    } else {
        return new FeedsByDateQuery(new Date(dateQueryString as string));
    }
}