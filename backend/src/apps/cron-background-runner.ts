import { CronJob } from "cron";
import { IFeedUpdater } from "../feeds/application/abstractions/feed-updater.interface";
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
        return new CronJob(
            cronTime,
            () => {
                try {
                    container.get<IFeedUpdater>(TYPES.IFeedUpdater).UpdateAllFeeds()
                } catch (error) {}
            }
        );
    }

    RunJobs(): void {
        this.jobs.forEach(job => job.start());
    }
}