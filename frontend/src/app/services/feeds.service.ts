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

    getFeeds(): Observable<Feeds> {
        const observableFeeds = this.http.get<Feed[]>(this.feedsUrl).pipe(
            catchError(this.handleError<Feeds>('getFeeds', []))
        );
        return observableFeeds;
    }

    private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
        return (error: any): Observable<T> => {
          console.error(error);
          console.error(`${operation} failed: ${error.message}`);
          return of(result as T);
        };
    }
}
