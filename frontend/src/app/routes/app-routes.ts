import { Routes } from '@angular/router';
import { AllFeedsComponent } from '../feeds/all-feeds/all-feeds.component';
import { CreateFeedComponent } from '../feeds/create-feed/create-feed.component';
import { FeedDatailComponent } from '../feeds/feed-datail/feed-datail.component';
import { FrontPageComponent } from '../front-page/front-page.component';

export const routes: Routes = [
    { path: '', redirectTo: '/today', pathMatch: 'full' },
    { path: 'today', component: FrontPageComponent },
    { path: 'feeds/:id', component: FeedDatailComponent },
    { path: 'feeds', component: AllFeedsComponent },
    { path: 'feeds/new', component: CreateFeedComponent }
];
