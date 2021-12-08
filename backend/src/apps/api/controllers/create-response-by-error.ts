import { Response } from "express";
import { FeedNotFoundError } from "../../../feeds/domain/errors/feed-not-found-error";
import { RepositoryTransactionError } from "../../../feeds/domain/errors/repository-transaction-error";

export const createResponseByError = (response: Response, error: unknown): Response => {
    const e = error as Error;
        
    if (e instanceof FeedNotFoundError) {
        response.status(404).send({error: e.message});
    } 
    else if (e instanceof RepositoryTransactionError) {
        response.status(500).send({error: e.message});
    } else {
        response.status(500).send({error: `an uncontrolled error happen - ${e.message}`});
    }
    
    return response;
}