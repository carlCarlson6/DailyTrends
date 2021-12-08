import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IFeedCrudService } from "../../../feeds/application/abstractions/feed-crud-service.interface";
import { IFeedUpdater } from "../../../feeds/application/abstractions/feed-updater.interface";
import { CreateFeedCommand } from "../../../feeds/application/messages/create-feed-command";
import { Feed } from "../../../feeds/domain/entities/feed";
import { FeedNotFoundError } from "../../../feeds/domain/errors/feed-not-found-error";
import { RepositoryTransactionError } from "../../../feeds/domain/errors/repository-transaction-error";
import { Logger } from "../../../feeds/domain/services/logger";
import { TYPES } from "../../../IoC/types";
import { createResponseByError } from "./create-response-by-error";

@injectable()
export class ExpressFeedsController {
    constructor(
        @inject(TYPES.IFeedCrudService)
        private readonly feedCrudService: IFeedCrudService,
        @inject(TYPES.Logger)
        private readonly logger: Logger,
    ) {}

    async Get(_: Request, response: Response) {
        try {
            const allFeeds = await this.feedCrudService.ReadAll();
            response.status(200).send(allFeeds);
        } catch (error) {
            response = createResponseByError(response, error);
        }
        return response;
    }

    async GetById(request: Request, response: Response) {
        try {
            const feedId = request.params.id;
            const feed = await this.feedCrudService.Read(feedId);
            response.status(200).send(feed);
        } catch (error: any) {
            response = createResponseByError(response, error);
        }
        return response;
    }

    async Post(request: Request, response: Response) {
        try {
            const command = request.body as CreateFeedCommand;
            const feed = await this.feedCrudService.Create(command);
            response.status(201).send(feed);
        } catch (error) {
            response = createResponseByError(response, error);
        }
        return response;
    }

    async Put(request: Request, response: Response) {
        try {
            const feedToUpdate = request.body as Feed;
            await this.feedCrudService.Update(feedToUpdate);
            response.status(204).send();            
        } catch (error) {
            response = createResponseByError(response, error);
        }

        return response;
    }

    async Delete(request: Request, response: Response) {
        try {
            const feedId = request.params.id;
            this.logger.LogInfo("executing delete", [feedId]);
            await this.feedCrudService.Delete(feedId);
            response.status(204).send();
        } catch(error) {
            response = createResponseByError(response, error);
        }
        
        return response;
    }
}
