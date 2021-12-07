import { Request, Response } from "express";
import { It, Mock, Times } from "moq.ts";
import { ExpressFeedsController } from "../../../src/apps/api/express-feeds-controller";
import { IFeedCrudService } from "../../../src/feeds/application/abstractions/feed-crud-service.interface";
import { IFeedUpdater } from "../../../src/feeds/application/abstractions/feed-updater.interface";
import { Feed } from "../../../src/feeds/domain/entities/feed";
import { FeedNotFoundError } from "../../../src/feeds/domain/errors/feed-not-found-error";
import { Logger } from "../../../src/feeds/domain/services/logger";

describe("Express Feeds Controller", () => {
    const feedCrudServiceMock = new Mock<IFeedCrudService>();
    const feedUpdaterMock = new Mock<IFeedUpdater>();
    const loggerMock = new Mock<Logger>();
    const controller = new ExpressFeedsController(feedCrudServiceMock.object(), feedUpdaterMock.object(), loggerMock.object());
    
    beforeEach(() => {
        loggerMock.setup(l => l.LogInfo(It.IsAny<string>(), It.IsAny<string[]>())).returns();
        loggerMock.setup(l => l.LogWarning(It.IsAny<string>(), It.IsAny<string[]>())).returns();
        loggerMock.setup(l => l.LogError(It.IsAny<string>(), It.IsAny<string[]>())).returns();
    });

    describe("given an id not correspond to any feed annd feedCrudService throws FeedNotFoundError", () => {
        it("when GetById then the controller should return 404 response code", async () => {
            const feedId = "some-id";
            feedCrudServiceMock.setup(fcs => fcs.Read(feedId)).throws(new FeedNotFoundError(feedId));

            const requestMock = new Mock<Request>();
            requestMock.setup(r => r.params).returns({id: feedId});

            const responseMock = new Mock<Response>();
            responseMock.setup(r => r.status(404)).returns(responseMock.object());
            responseMock.setup(r => r.send({})).returns(responseMock.object());

            await controller.GetById(requestMock.object(), responseMock.object());

            responseMock.verify(r => r.status(404), Times.Once());
        });

        it("when Put then the controller should return 404 response code", async () => {
            const feedId = "some-id";
            const feed = new Feed(feedId, "", "", "", "", "");
            feedCrudServiceMock.setup(fcs => fcs.Update(feed)).throws(new FeedNotFoundError(feedId));

            const requestMock = new Mock<Request>();
            requestMock.setup(r => r.body).returns(feed);

            const responseMock = new Mock<Response>();
            responseMock.setup(r => r.status(404)).returns(responseMock.object());
            responseMock.setup(r => r.send({})).returns(responseMock.object());

            await controller.Put(requestMock.object(), responseMock.object());

            responseMock.verify(r => r.status(404), Times.Once());
        });

        it("when Delete then the controller should return 404 response code", async () => {
            const feedId = "some-id";
            feedCrudServiceMock.setup(fcs => fcs.Delete(feedId)).throws(new FeedNotFoundError(feedId));

            const requestMock = new Mock<Request>();
            requestMock.setup(r => r.params).returns({id: feedId});

            const responseMock = new Mock<Response>();
            responseMock.setup(r => r.status(404)).returns(responseMock.object());
            responseMock.setup(r => r.send({})).returns(responseMock.object());

            await controller.Delete(requestMock.object(), responseMock.object());

            responseMock.verify(r => r.status(404), Times.Once());
        })
    });
});