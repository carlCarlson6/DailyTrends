import { Routes } from '@angular/router';
import { AllFeedsComponent } from '../feeds/all-feeds/all-feeds.component';
import { CreateFeedComponent } from '../feeds/create-feed/create-feed.component';
import { FeedDetailComponent } from '../feeds/feed-detail/feed-detail.component';
import { FrontPageComponent } from '../front-page/front-page.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: '/today', pathMatch: 'full' },
    { path: 'today', component: FrontPageComponent },
    { path: 'feeds/:id', component: FeedDetailComponent },
    { path: 'feeds', component: AllFeedsComponent },
    { path: 'add', component: CreateFeedComponent },
    { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];
