import { Component, Input, OnInit } from '@angular/core';
import { Feeds } from 'src/app/models/feed';

@Component({
    selector: 'app-feeds-in-columns',
    templateUrl: './feeds-in-columns.component.html',
    styleUrls: ['./feeds-in-columns.component.scss']
})
export class FeedsInColumnsComponent {
    @Input() feeds: Feeds = [];
}
