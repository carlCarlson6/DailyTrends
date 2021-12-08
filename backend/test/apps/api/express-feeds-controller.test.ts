import e, { Request, Response } from "express";
import { It, Mock, Times } from "moq.ts";
import { ExpressFeedsController } from "../../../src/apps/api/controllers/express-feeds-controller";
import { IFeedCrudService } from "../../../src/feeds/application/abstractions/feed-crud-service.interface";
import { IFeedQueryHandler } from "../../../src/feeds/application/abstractions/feed-query-handler.interface";
import { CreateFeedCommand } from "../../../src/feeds/domain/commands/create-feed-command";
import { Feed } from "../../../src/feeds/domain/entities/feed";
import { FeedNotFoundError } from "../../../src/feeds/domain/errors/feed-not-found-error";
import { RepositoryTransactionError } from "../../../src/feeds/domain/errors/repository-transaction-error";
import { Logger } from "../../../src/feeds/domain/services/logger";

describe("Express Feeds Controller", () => {
    const feedCrudServiceMock = new Mock<IFeedCrudService>();
    const queryHandlerMock = new Mock<IFeedQueryHandler>();
    const loggerMock = new Mock<Logger>();
    const controller = new ExpressFeedsController(feedCrudServiceMock.object(), queryHandlerMock.object(), loggerMock.object());
    
    const buildRequestResponseMocks = () => ({
        requestMock: new Mock<Request>(),
        responseMock: new Mock<Response>(),
    });

    beforeEach(() => {
        loggerMock.setup(l => l.LogInfo(It.IsAny<string>(), It.IsAny<string[]>())).returns();
        loggerMock.setup(l => l.LogWarning(It.IsAny<string>(), It.IsAny<string[]>())).returns();
        loggerMock.setup(l => l.LogError(It.IsAny<string>(), It.IsAny<string[]>())).returns();
    });

    describe("given a succesfull request", () => {
        it("when Get then 200 status code is returned", async () => {
            feedCrudServiceMock.setup(fc => fc.ReadAll()).returns(Promise.resolve(It.IsAny<Feed[]>()));

            const {requestMock, responseMock} = buildRequestResponseMocks();
            requestMock.setup(r => r.query).returns({});
            responseMock.setup(r => r.status(200)).returns(responseMock.object());
            responseMock.setup(r => r.send(It.IsAny<Feed[]>())).returns(responseMock.object());

            await controller.Get(requestMock.object(), responseMock.object());

            responseMock.verify(r => r.status(200), Times.Once());
        });

        it("when GetById then 200 status code is returned", async () => {
            feedCrudServiceMock.setup(fc => fc.Read(It.IsAny<string>())).returns(Promise.resolve(It.IsAny<Feed>()));

            const {requestMock, responseMock} = buildRequestResponseMocks();
            requestMock.setup(r => r.params).returns({id: It.IsAny<string>()});
            responseMock.setup(r => r.status(200)).returns(responseMock.object());
            responseMock.setup(r => r.send(It.IsAny<Feed[]>())).returns(responseMock.object());

            await controller.GetById(requestMock.object(), responseMock.object());

            responseMock.verify(r => r.status(200), Times.Once());
        });

        it("when Post then 201 status code is returned", async () => {
            feedCrudServiceMock.setup(fc => fc.Create(It.IsAny<CreateFeedCommand>())).returns(Promise.resolve(It.IsAny<Feed>()));

            const {requestMock, responseMock} = buildRequestResponseMocks();
            requestMock.setup(r => r.body).returns(It.IsAny<CreateFeedCommand>());
            responseMock.setup(r => r.status(201)).returns(responseMock.object());
            responseMock.setup(r => r.send(It.IsAny<Feed>())).returns(responseMock.object());

            await controller.Post(requestMock.object(), responseMock.object());

            responseMock.verify(r => r.status(201), Times.Once());
        });

        it("when Put then 204 status code is returned", async () => {
            feedCrudServiceMock.setup(fc => fc.Update(It.IsAny<Feed>())).returns(Promise.resolve());

            const {requestMock, responseMock} = buildRequestResponseMocks();
            requestMock.setup(r => r.body).returns(It.IsAny<Feed>());
            responseMock.setup(r => r.status(204)).returns(responseMock.object());
            responseMock.setup(r => r.send()).returns(responseMock.object());

            await controller.Put(requestMock.object(), responseMock.object());

            responseMock.verify(r => r.status(204), Times.Once());
        });

        it("when Delete then 204 status code is returned", async () => {
            feedCrudServiceMock.setup(fc => fc.Delete(It.IsAny<string>())).returns(Promise.resolve());

            const {requestMock, responseMock} = buildRequestResponseMocks();
            requestMock.setup(r => r.params).returns({id: It.IsAny<string>()});
            responseMock.setup(r => r.status(204)).returns(responseMock.object());
            responseMock.setup(r => r.send()).returns(responseMock.object());

            await controller.Delete(requestMock.object(), responseMock.object());

            responseMock.verify(r => r.status(204), Times.Once());
        });

    });

    describe("given a failed request", () => {
        describe("and a RepositoryTransactionError is thrown", () => {
            const setupResponseMock = (responseMock: Mock<Response>, error: RepositoryTransactionError): Mock<Response> => {
                responseMock.setup(r => r.status(500)).returns(responseMock.object());
                responseMock.setup(r => r.send(It.Is<{error: string}>(e => e.error === error.message))).returns(responseMock.object());
                return responseMock
            };
            const checkRepositoryTransactionError = (responseMock: Mock<Response>, error: RepositoryTransactionError) => {
                responseMock.verify(r => r.status(500), Times.Once());
                responseMock.verify(r => r.send(It.Is<{error: string}>(e => e.error === error.message)), Times.Once());
            };

            it("when Get then 500 status code is returned", async () => {
                const error = new RepositoryTransactionError(It.IsAny<string>());
                feedCrudServiceMock.setup(fc => fc.ReadAll()).throws(error);
            
                let {requestMock, responseMock} = buildRequestResponseMocks();
                requestMock.setup(r => r.query).returns({});
                responseMock = setupResponseMock(responseMock, error);

                await controller.Get(requestMock.object(), responseMock.object());
    
                checkRepositoryTransactionError(responseMock, error);
            });

            it("when GetById then 500 status code is returned", async () => {
                const error = new RepositoryTransactionError(It.IsAny<string>());
                feedCrudServiceMock.setup(fc => fc.Read(It.IsAny<string>())).throws(error);
            
                let {requestMock, responseMock} = buildRequestResponseMocks();
                requestMock.setup(r => r.params).returns({id: It.IsAny<string>()});
                responseMock = setupResponseMock(responseMock, error);

                await controller.GetById(requestMock.object(), responseMock.object());
    
                checkRepositoryTransactionError(responseMock, error);
            });

            it("when Post then 500 status code is returned", async () => {
                const error = new RepositoryTransactionError(It.IsAny<string>());
                feedCrudServiceMock.setup(fc => fc.Create(It.IsAny<CreateFeedCommand>())).throws(error);

                let {requestMock, responseMock} = buildRequestResponseMocks();
                requestMock.setup(r => r.body).returns(It.IsAny<CreateFeedCommand>());
                responseMock = setupResponseMock(responseMock, error);

                await controller.Post(requestMock.object(), responseMock.object());
    
                checkRepositoryTransactionError(responseMock, error);
            });

            it("when Put then 500 status code is returned", async () => {
                const error = new RepositoryTransactionError(It.IsAny<string>());
                feedCrudServiceMock.setup(fc => fc.Update(It.IsAny<Feed>())).throws(error);

                let {requestMock, responseMock} = buildRequestResponseMocks();
                requestMock.setup(r => r.body).returns(It.IsAny<Feed>());
                responseMock = setupResponseMock(responseMock, error);

                await controller.Put(requestMock.object(), responseMock.object());
    
                checkRepositoryTransactionError(responseMock, error);
            });

            it("when Delete then 500 status code is returned", async () => {
                const error = new RepositoryTransactionError(It.IsAny<string>());
                feedCrudServiceMock.setup(fc => fc.Delete(It.IsAny<string>())).throws(error);

                let {requestMock, responseMock} = buildRequestResponseMocks();
                requestMock.setup(r => r.params).returns({id: It.IsAny<string>()});
                responseMock = setupResponseMock(responseMock, error);

                await controller.Put(requestMock.object(), responseMock.object());
    
                checkRepositoryTransactionError(responseMock, error);
            });
        });

        describe("and FeedNotFoundError is thrown", () => {
            const setupResponseMock = (responseMock: Mock<Response>, error: FeedNotFoundError): Mock<Response> => {
                responseMock.setup(r => r.status(404)).returns(responseMock.object());
                responseMock.setup(r => r.send(It.Is<{error: string}>(e => e.error === error.message))).returns(responseMock.object());
                return responseMock
            };
            const checkFeedNotFoundError = (responseMock: Mock<Response>, error: FeedNotFoundError) => {
                responseMock.verify(r => r.status(404), Times.Once());
                responseMock.verify(r => r.send(It.Is<{error: string}>(e => e.error === error.message)), Times.Once());
            };

            it("when GetById then the controller should return 404 response code", async () => {
                const error = new FeedNotFoundError(It.IsAny<string>());
                feedCrudServiceMock.setup(fcs => fcs.Read(It.IsAny<string>())).throws(error);
    
                let {requestMock, responseMock} = buildRequestResponseMocks();
                requestMock.setup(r => r.params).returns({id: It.IsAny()});
                responseMock = setupResponseMock(responseMock, error);
    
                await controller.GetById(requestMock.object(), responseMock.object());
    
                checkFeedNotFoundError(responseMock, error);
            });

            it("when Put then the controller should return 404 response code", async () => {
                const error = new FeedNotFoundError(It.IsAny<string>());
                feedCrudServiceMock.setup(fcs => fcs.Update(It.IsAny<Feed>())).throws(error);
    
                let {requestMock, responseMock} = buildRequestResponseMocks();
                requestMock.setup(r => r.body).returns(It.IsAny<Feed>());
                responseMock = setupResponseMock(responseMock, error);
    
                await controller.Put(requestMock.object(), responseMock.object());
    
                checkFeedNotFoundError(responseMock, error);
            });

            it("when Delete then the controller should return 404 response code", async () => {
                const error = new FeedNotFoundError(It.IsAny<string>());
                feedCrudServiceMock.setup(fcs => fcs.Delete(It.IsAny<string>())).throws(error);
    
                let {requestMock, responseMock} = buildRequestResponseMocks();
                requestMock.setup(r => r.params).returns({id: It.IsAny<string>()});
                responseMock = setupResponseMock(responseMock, error);
    
                await controller.Delete(requestMock.object(), responseMock.object());
    
                checkFeedNotFoundError(responseMock, error);
            });
        });
    });
});