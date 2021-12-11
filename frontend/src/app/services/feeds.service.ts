import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { Feed, Feeds } from "../models/feed";

@Injectable({
    providedIn: 'root'
})
export class FeedsService {
    private feedsUrl = 'api/feeds';
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private readonly http: HttpClient
    ) {}

    getFeedsByDate(date: Date): Observable<Feeds> {
        const url = this.buildFeedsUrlWithDate(date);
        const observableFeeds = this.http.get<Feeds>(url).pipe(
            catchError(this.handleError<Feeds>('getFeedsByDate', []))
        );
        return observableFeeds;
    }

    getFeeds(): Observable<Feeds> {
        const observableFeeds = this.http.get<Feed[]>(this.feedsUrl).pipe(
            catchError(this.handleError<Feeds>('getFeeds', []))
        );
        return observableFeeds;
    }

    getFeed(feedId: string): Observable<Feed> {
        const url = this.buildFeedsUrlWithId(feedId);
        const observableFeed = this.http.get<Feed>(url).pipe(
            catchError(this.handleError<Feed>('getFeed'))
        );
        return observableFeed;
    }

    postFeed(feed: Feed): Observable<Feed> {
        const observableFeed = this.http.post<Feed>(this.feedsUrl, feed, this.httpOptions).pipe(
            catchError(this.handleError<Feed>('postFeed'))
        );
        return observableFeed;
    }

    updateFeed(feed: Feed): Observable<any> {
        const observableResponse = this.http.put(this.feedsUrl, feed, this.httpOptions).pipe(
            catchError(this.handleError<any>('putFeed'))
        );
        return observableResponse;
    }

    deleteFeed(feed: Feed): Observable<any> {
        const url = this.buildFeedsUrlWithId(feed.id);
        const observableResponse = this.http.delete(url, this.httpOptions).pipe(
            catchError(this.handleError<any>('postFeed'))
        );
        return observableResponse;
    }

    private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
        return (error: any): Observable<T> => {
          console.error(error);
          console.error(`${operation} failed: ${error.message}`);
          return of(result as T);
        };
    }

    private buildFeedsUrlWithDate(date:Date): string {
        return `${this.feedsUrl}?date=${date}`;
    }

    private buildFeedsUrlWithId(feedId: string): string {
        return `${this.feedsUrl}/${feedId}`;
    }
}
