import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Feed, Feeds } from 'src/app/models/feed';
import { FeedsService } from 'src/app/services/feeds.service';

@Component({
    selector: 'app-feed-card',
    templateUrl: './feed-card.component.html'
})
export class FeedCardComponent {
    @Input() feed!: Feed;

    @Input() allFeeds: Feeds = [];
    @Output() allFeedsChange = new EventEmitter<Feeds>();

    private displayMaxBodyLength = 240;

    constructor(
        private readonly feedsService: FeedsService
    ) {}

    displayBodyResume(): string {
        if (this.feed.body.length <= this.displayMaxBodyLength) {
            return this.feed.body;
        }

        const resumeBody = this.feed.body.slice(0, 240).concat('...')
        return resumeBody;
    }

    handleDelete(): void {
        this.feedsService.deleteFeed(this.feed).subscribe();
        this.allFeeds = this.allFeeds.filter(f => f.id !== this.feed.id);
        this.allFeedsChange.emit(this.allFeeds);
    }
}
