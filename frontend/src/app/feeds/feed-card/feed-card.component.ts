import { Component, Input, OnInit } from '@angular/core';
import { Feed } from 'src/app/models/feed';

@Component({
    selector: 'app-feed-card',
    templateUrl: './feed-card.component.html'
})
export class FeedCardComponent  {
    @Input() feed!: Feed;

    private displayMaxBodyLength = 240;

    displayBodyResume(): string {
        if (this.feed.body.length <= this.displayMaxBodyLength) {
            return this.feed.body;
        }

        const resumeBody = this.feed.body.slice(0, 240).concat(' ...')
        return resumeBody;
    }
}
