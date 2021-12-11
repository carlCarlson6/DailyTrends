import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Feed } from 'src/app/models/feed';
import { Location } from '@angular/common';
import { FeedsService } from 'src/app/services/feeds.service';

@Component({
    selector: 'app-feed-datail',
    templateUrl: './feed-detail.component.html',
    styleUrls: ['./feed-detail.component.scss']
})
export class FeedDetailComponent implements OnInit {
    feed: Feed | undefined;

    constructor(
        private readonly feedsService: FeedsService,
        private readonly route: ActivatedRoute,
        private readonly location: Location,
    ) {}

    ngOnInit(): void {
        this.getFeed();
    }

    getFeed(): void {
        const feedId = this.route.snapshot.paramMap.get('id')!;
        this.feedsService.getFeed(feedId).subscribe(
            data => {
                this.feed = data;
                if (!this.feed) {
                    this.location.go('/today');
                }
            },
            _ => this.location.go('/today')
        );
    }

    onSubmit(): void {
        console.log(this.feed);
        this.feedsService.updateFeed(this.feed!).subscribe();
        this.location.go('');
        window.location.reload()
    }

}
