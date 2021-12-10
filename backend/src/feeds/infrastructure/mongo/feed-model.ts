import { id } from "inversify";
import { Feed } from "../../domain/entities/feed"

export interface FeedModel {
    id: string,
    title: string,
    body: string,
    image: string,
    source: string,
    publisher: string,
    date: string,
}

export const intoDomainFeed = (feedModel: FeedModel): Feed => new Feed(
    feedModel.id,
    feedModel.title,
    feedModel.body,
    feedModel.image,
    feedModel.source,
    feedModel.publisher,
    new Date(feedModel.date)
);

export const intoFeedModel = (feed: Feed): FeedModel => ({ ...feed, date: feed.date.toDateString()});