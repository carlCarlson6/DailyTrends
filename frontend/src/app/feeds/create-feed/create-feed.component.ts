import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Feed } from 'src/app/models/feed';
import { FeedsService } from 'src/app/services/feeds.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-create-feed',
    templateUrl: './create-feed.component.html',
    styleUrls: ['./create-feed.component.scss']
})
export class CreateFeedComponent {

    inputFeedForm = new FormGroup({
        title: new FormControl('', Validators.required),
        publisher: new FormControl('', Validators.required),
        image: new FormControl('', Validators.required),
        source: new FormControl('', Validators.required),
        body: new FormControl('', Validators.required),
    });

    constructor(
        private readonly feedsService: FeedsService,
        private location: Location
    ) {}

    onSubmit(): void {
        const feed: Feed = this.inputFeedForm.value;
        this.feedsService.postFeed(feed).subscribe();
        this.location.back();
    }
}
