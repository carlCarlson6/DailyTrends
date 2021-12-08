import { Request, Response, Router } from "express";
import { container } from "../../../IoC/ioc-container";
import { TYPES } from "../../../IoC/types";
import { ExpressFeedsController } from "../controllers/express-feeds-controller";
import { ExpressRouter } from "./abstractions/express-router";

export class FeedsRoutes implements ExpressRouter {
    public router = Router();
    public path = "/api/feeds";
    
    private readonly controller = container.get<ExpressFeedsController>(TYPES.ExpressFeedsController);

    DeclareRoutes(): void {
        console.log("building feeds routes");
        this.router.get("/", this.Get);
        this.router.get("/:id", this.GetById);
        this.router.post("/", this.Post);
        this.router.put("/", this.Put);
        this.router.delete("/:id", this.Delete);
    }

    private Get = (request: Request, response: Response) => this.controller.Get(request, response);
    private GetById = (request: Request, response: Response) => this.controller.GetById(request, response);
    private Post = (request: Request, response: Response) => this.controller.Post(request, response);
    private Put = (request: Request, response: Response) => this.controller.Put(request, response);
    private Delete = (request: Request, response: Response) => this.controller.Delete(request, response);
}

export const feedsRoutes = () => new FeedsRoutes();
