export interface Feed {
    id: string,
    title: string,
    body: string,
    image: string,
    source: string,
    publisher: string,
    date: Date,
}

export type Feeds = Feed[];
