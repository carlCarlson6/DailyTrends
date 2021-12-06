import { ExpressApiServer } from "./apps/api/express-api-server";
import { CronBackgroundRunner } from "./apps/cron-background-runner";
import { config as readEnvConfig } from "dotenv";
import { container } from "./IoC/ioc-container";
import { IMongoDbConnector } from "./feeds/infrastructure/mongo/mongo-connector";
import { TYPES } from "./IoC/types";

const testDbConnection = async () => await container.get<IMongoDbConnector>(TYPES.IMongoDbConnector).TestConnection();

const bootstrapBackend = async () => {
    console.log("starting backend");

    console.log("testing db connection");
    await testDbConnection();

    console.log("starting background jobs");
    new CronBackgroundRunner().AddJobs().RunJobs();

    console.log("starting api");
    new ExpressApiServer().Configure().Start();
};

readEnvConfig();
bootstrapBackend();