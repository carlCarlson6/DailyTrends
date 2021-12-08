import { DomainQuery } from "./domain-query";

export class FeedsByDateQuery implements DomainQuery {
    constructor(
        readonly Date: Date
    ) {}
}