import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IFeedCrudService } from "../../feeds/application/abstractions/feed-crud-service.interface";
import { IFeedUpdater } from "../../feeds/application/abstractions/feed-updater.interface";
import { CreateFeedCommand } from "../../feeds/application/messages/create-feed-command";
import { Feed } from "../../feeds/domain/entities/feed";
import { FeedNotFoundError } from "../../feeds/domain/errors/feed-not-found-error";
import { Logger } from "../../feeds/domain/services/logger";
import { TYPES } from "../../IoC/types";

@injectable()
export class ExpressFeedsController {
    constructor(
        @inject(TYPES.IFeedCrudService)
        private readonly feedCrudService: IFeedCrudService,
        @inject(TYPES.IFeedUpdater)
        private readonly feedUpdater: IFeedUpdater,
        @inject(TYPES.Logger)
        private readonly logger: Logger,
    ) {}

    async Get(_: Request, response: Response) {
        try {
            const allFeeds = await this.feedCrudService.ReadAll();
            response.status(200).send(allFeeds);
        } catch (error) {
            response.status(500).send(error);
        }
        return response;
    }

    async GetById(request: Request, response: Response) {
        try {
            const feedId = request.params.id;
            const feed = await this.feedCrudService.Read(feedId);
            response.status(200).send(feed);
        } catch (error: any) {
            response = this.CreateResponseByError(response, error);
        }
        return response;
    }

    async Post(request: Request, response: Response) {
        try {
            const command = request.body as CreateFeedCommand;
            const feed = await this.feedCrudService.Create(command);
            this.feedUpdater.UpdateFeed(feed);
            response.status(200).send(feed);
        } catch (error) {
            response.status(500).send(error);
        }
        return response;
    }

    async Put(request: Request, response: Response) {
        try {
            const feedToUpdate = request.body as Feed;
            await this.feedCrudService.Update(feedToUpdate);
            response.status(200).send();            
        } catch (error) {
            response = this.CreateResponseByError(response, error);
        }

        return response;
    }

    async Delete(request: Request, response: Response) {
        try {
            const feedId = request.params.id;
            this.logger.LogInfo("executing delete", [feedId]);
            await this.feedCrudService.Delete(feedId);
            response.status(200).send();
        } catch(error) {
            response = this.CreateResponseByError(response, error);
        }
        
        return response;
    }

    private CreateResponseByError(response: Response, error: unknown) {
        const e = error as Error;
        
        if (e instanceof FeedNotFoundError) {
            response.status(404).send({error: e.message});
        } else {
            response.status(500).send({error: e.message});
        }
        return response;
    } 
}
