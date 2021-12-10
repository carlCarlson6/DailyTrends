import { Component, OnInit } from '@angular/core';
import { Feeds } from '../models/feed';
import { FeedsService } from '../services/feeds.service';

@Component({
    selector: 'app-front-page',
    templateUrl: './front-page.component.html',
    styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit {

    feeds: Feeds = []

    constructor(
        private readonly feedsService: FeedsService
    ) {}

    ngOnInit(): void {
        this.getFeeds();
    }

    getFeeds(): void {
        this.feedsService.getFeedsByDate(new Date()).subscribe(data => this.feeds = data);
    }

}
