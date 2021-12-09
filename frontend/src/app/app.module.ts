import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { baseUrlIncerceptorProviders } from './services/base-url-interceptor.service';
import { AllFeedsComponent } from './feeds/all-feeds/all-feeds.component';
import { FeedDatailComponent } from './feeds/feed-datail/feed-datail.component';
import { CreateFeedComponent } from './feeds/create-feed/create-feed.component';
import { FrontPageComponent } from './front-page/front-page.component';

@NgModule({
    declarations: [
        AppComponent,
        NavigationBarComponent,
        AllFeedsComponent,
        FeedDatailComponent,
        CreateFeedComponent,
        FrontPageComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [
        ...baseUrlIncerceptorProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
