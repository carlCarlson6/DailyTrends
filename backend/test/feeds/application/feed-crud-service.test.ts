import { It, Mock, Times } from "moq.ts";
import { FeedCrudService } from "../../../src/feeds/application/feed-crud-service";
import { CreateFeedCommand } from "../../../src/feeds/domain/commands/create-feed-command";
import { Feed } from "../../../src/feeds/domain/entities/feed";
import { FeedNotFoundError } from "../../../src/feeds/domain/errors/feed-not-found-error";
import { FeedRepository } from "../../../src/feeds/domain/services/feed-repository";
import { validate as validateUuid } from "uuid";
import { Logger } from "../../../src/feeds/domain/services/logger";

describe("Feed CRUD Service", () => {
    const feedRepositoryMock = new Mock<FeedRepository>();
    const loggerMock = new Mock<Logger>();
    const crudFeed = new FeedCrudService(feedRepositoryMock.object(), loggerMock.object());

    beforeEach(() => {
        loggerMock.setup(l => l.LogInfo(It.IsAny<string>(), It.IsAny<string[]>())).returns();
        loggerMock.setup(l => l.LogWarning(It.IsAny<string>(), It.IsAny<string[]>())).returns();
        loggerMock.setup(l => l.LogError(It.IsAny<string>(), It.IsAny<string[]>())).returns();
    });

    describe("given already stored feeds", () => {
        let feeds: Feed[] = [
            new Feed("", "", "", "", "", "", new Date()),
            new Feed("", "", "", "", "", "", new Date()),
            new Feed("", "", "", "", "", "", new Date()),
        ];

        beforeEach(() => {
            feedRepositoryMock.setup(fr => fr.ReadAll()).returns(Promise.resolve(feeds));
            feedRepositoryMock.setup(fr => fr.Save(It.IsAny<Feed>())).returns(Promise.resolve());
        });

        it("when ReadAll then returns all feeds", async () => {
            const allFeeds = await crudFeed.ReadAll();

            expect(allFeeds).not.toBeNull();
            expect(allFeeds).not.toBeUndefined();
            expect(allFeeds).toHaveLength(feeds.length);
        });
    });

    describe("given no feed already stored", () => {
        beforeEach(() => {
            feedRepositoryMock.setup(fr => fr.Read(It.IsAny<string>())).returns(Promise.resolve(null));
            feedRepositoryMock.setup(fr => fr.ReadAll()).returns(Promise.resolve([]));
            feedRepositoryMock.setup(fr => fr.Save(It.IsAny<Feed>())).returns(Promise.resolve());
        });

        describe("and all data is valid", () => {
            it("when Create then a new feed is saved", async () => {
                const title = "some-title";
                const body = "some-body";
                const image = "some-image";
                const source = "some-source";
                const publisher = "some-publisher";
                const command = new CreateFeedCommand(title, body, image, source, publisher);

                const feed = await crudFeed.Create(command);

                feedRepositoryMock.verify(fr => fr.Save(feed), Times.Once());

                expect(feed).not.toBeNull();
                expect(feed).not.toBeNull();

                expect(validateUuid(feed.id)).toBeTruthy();
                expect(feed).toEqual({ id: feed.id, title, body, image, source, publisher });
            });
        });

        it("when ReadAll then an empty list is returned", async () => {
            const allFeeds = await crudFeed.ReadAll();
            expect(allFeeds).not.toBeNull();
            expect(allFeeds).not.toBeUndefined();
            expect(allFeeds).toStrictEqual([]);
            expect(allFeeds).toHaveLength(0);
        });

        it("when Read then FeedNotFoundError is thrown", async () => {
            const feedId = "some-id";
            const errorThrower = async () => await crudFeed.Read(feedId);
            expect(errorThrower).rejects.toThrow(FeedNotFoundError);
            expect(errorThrower).rejects.toThrow(`feed with id ${feedId} was not found`);
        });

        it("when Update then FeedNotFoundError is thrown", async () => {
            const feedId = "some-id";
            const feed = new Feed(feedId, "some-title", "some-body", "some-image", "some-source", "some-publisher", new Date());
            const errorThrower = async () => await crudFeed.Update(feed);
            expect(errorThrower).rejects.toThrow(FeedNotFoundError);
            expect(errorThrower).rejects.toThrow(`feed with id ${feedId} was not found`);
        });

        it("when Delete then FeedNotFoundError is thrown", async () => {
            const feedId = "some-id";
            const errorThrower = async () => await crudFeed.Delete(feedId);
            expect(errorThrower).rejects.toThrow(FeedNotFoundError);
            expect(errorThrower).rejects.toThrow(`feed with id ${feedId} was not found`);
        });
    });
});