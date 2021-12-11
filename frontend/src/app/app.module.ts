import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { baseUrlIncerceptorProviders } from './services/base-url-interceptor.service';
import { AllFeedsComponent } from './feeds/all-feeds/all-feeds.component';
import { FeedDetailComponent } from './feeds/feed-detail/feed-detail.component';
import { CreateFeedComponent } from './feeds/create-feed/create-feed.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { FeedCardComponent } from './feeds/feed-card/feed-card.component';
import { FeedsService } from './services/feeds.service';
import { FeedsInColumnsComponent } from './feeds/feeds-in-columns/feeds-in-columns.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        NavigationBarComponent,
        AllFeedsComponent,
        FeedDetailComponent,
        CreateFeedComponent,
        FrontPageComponent,
        FeedCardComponent,
        FeedsInColumnsComponent,
        PageNotFoundComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        ...baseUrlIncerceptorProviders,
        FeedsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
