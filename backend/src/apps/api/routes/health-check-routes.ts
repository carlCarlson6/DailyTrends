import { Request, Response, Router } from "express";
import { ExpressRouter } from "./abstractions/express-router";

export class HealthCheckRoutes implements ExpressRouter {
    public router = Router();
    public path = "/api/health";

    DeclareRoutes(): void {
        this.router.get(
            "/", 
            (_: Request, response: Response) => response.status(200).send("hello world! :)"),
        );
        this.router.get(
            "/:message", 
            (request: Request, response: Response) => response.status(200).send(request.params.message)
        );
    }
}

export const healthCheckRoutes = () => new HealthCheckRoutes();
