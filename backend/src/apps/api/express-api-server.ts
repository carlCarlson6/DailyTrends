import 'reflect-metadata';
import express, { Express } from 'express';
import cors from 'cors';
import { healthCheckRoutes } from './routes/health-check-routes';
import { feedsRoutes } from './routes/feeds-routes';

export class ExpressApiServer {
    private app: Express = express();
    private routers = [
        healthCheckRoutes(),
        feedsRoutes(),
    ];

    private ApplyMiddleware() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    private AddRoutes() {
        this.routers.forEach(router => {
            router.DeclareRoutes();
            console.log(router.path);
            this.app.use(router.path, router.router);
        });
    }

    Configure(): ExpressApiServer {
        this.app.set('port', process.env.API_PORT || 4000);
        this.ApplyMiddleware();
        this.AddRoutes();
        return this;
    }
    
    Start() {
        this.app.listen(
            this.app.get('port'), 
            '0.0.0.0', 
            () => console.log('the server is running on', this.app.get('port'))
        );
    }
}
