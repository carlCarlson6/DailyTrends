import { IRouter } from "express";

export interface ExpressRouter {
    router: IRouter;
    path: string;
    DeclareRoutes(): void;
}