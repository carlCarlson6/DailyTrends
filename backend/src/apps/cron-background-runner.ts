import { CronJob } from "cron";
import { IFeedReader } from "../feeds/application/abstractions/feed-reader.interface";
import { Logger } from "../feeds/domain/services/logger";
import { container } from "../IoC/ioc-container";
import { TYPES } from "../IoC/types";

export class CronBackgroundRunner {
    private jobs: CronJob[] = [];

    AddJobs(): CronBackgroundRunner {
        this.jobs = [this.BuildUpdateFeedsJob()];
        return this;
    }

    private BuildUpdateFeedsJob(): CronJob {
        const cronTime = process.env.UPDATE_ALL_FEEDS_CRON_TIME_JOB!;
        return new CronJob({
            cronTime,
            onTick: async () => {
                const logger = container.get<Logger>(TYPES.Logger);
                try {
                    logger.LogInfo("starting cron job", []);
                    await container.get<IFeedReader>(TYPES.IFeedReader).Execute();
                    logger.LogInfo("cron job ended", []);
                } catch (error) {
                    const e = error as Error;
                    logger.LogError("something happened while executing the cron job", [e.message])
                }
            },
            runOnInit: true,
        });
    }

    RunJobs(): void {
        this.jobs.forEach(job => job.start());
    }
}