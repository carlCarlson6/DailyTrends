import { Component, OnInit } from '@angular/core';
import { Feeds } from 'src/app/models/feed';
import { FeedsService } from 'src/app/services/feeds.service';

@Component({
    selector: 'app-all-feeds',
    templateUrl: './all-feeds.component.html',
    styleUrls: ['./all-feeds.component.scss']
})
export class AllFeedsComponent implements OnInit {
    feeds: Feeds = [];

    constructor(
        private readonly feedsService: FeedsService
    ) { }

    ngOnInit(): void {
        this.getAllFeeds();
    }

    getAllFeeds(): void {
        this.feedsService.getFeeds().subscribe(data => this.feeds = data);
    }
}
