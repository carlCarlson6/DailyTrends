export class FeedNotFoundError extends Error {
    constructor(feedId: string) {
        super(`feed with id ${feedId} was not found`);
        Object.setPrototypeOf(this, FeedNotFoundError.prototype);
    }
}
