import { Feed } from "../entities/feed";
import { Specification } from "./specification";

export class FeedsByDateSpecification extends Specification<Feed> {
    constructor(
        private readonly date: Date
    ) {
        super();
    }

    ToExpression(): (type: Feed) => boolean {
        return (feed: Feed) => this.AreFromSameDay(this.date, feed.date);
    }

    private AreFromSameDay(date1: Date, date2: Date): boolean {
        return date1.getDay() == date2.getDay() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear();
    }
}
