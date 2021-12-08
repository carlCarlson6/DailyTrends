import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IFeedCrudService } from "../../../feeds/application/abstractions/feed-crud-service.interface";
import { IFeedQueryHandler } from "../../../feeds/application/abstractions/feed-query-handler.interface";
import { CreateFeedCommand } from "../../../feeds/domain/commands/create-feed-command";
import { Feed } from "../../../feeds/domain/entities/feed";
import { Logger } from "../../../feeds/domain/services/logger";
import { TYPES } from "../../../IoC/types";
import { createResponseByError } from "./create-response-by-error";
import { ParseRequestQueryIntoDomainQuery } from "./parse-request-query-into-domain-query";

@injectable()
export class ExpressFeedsController {
    constructor(
        @inject(TYPES.IFeedCrudService)
        private readonly feedCrudService: IFeedCrudService,
        @inject(TYPES.IFeedQueryHandler)
        private readonly queryHandler: IFeedQueryHandler,
        @inject(TYPES.Logger)
        private readonly logger: Logger,
    ) {}

    async Get(request: Request, response: Response) {
        try {
            let feeds: Feed[];

            const query = ParseRequestQueryIntoDomainQuery(request);

            if (!query) {
                feeds = await this.feedCrudService.ReadAll();
            } else {
                feeds = await this.queryHandler.Handle(query);
            }

            response.status(200).send(feeds);
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
