import { It, Mock } from "moq.ts";
import { Logger } from "../../../../src/feeds/domain/services/logger";
import { ElMundoReader } from "../../../../src/feeds/infrastructure/scrapeit-reader/el-mundo-reader";

describe("El Mundo reader", () => {
    const loggerMock = new Mock<Logger>();
    const reader = new ElMundoReader(loggerMock.object());

    beforeEach(() => {
        loggerMock.setup(l => l.LogInfo(It.IsAny<string>(), It.IsAny<string[]>())).returns();
        loggerMock.setup(l => l.LogWarning(It.IsAny<string>(), It.IsAny<string[]>())).returns();
        loggerMock.setup(l => l.LogError(It.IsAny<string>(), It.IsAny<string[]>())).returns();
    });

    it("when Read then retuns 5 articles with all the fields", async () => {
        var feeds = await reader.Read();

        expect(feeds).not.toBeNull();
        expect(feeds).toHaveLength(5);

        feeds.forEach(feed => {
            expect(feed.title).not.toEqual('');
            expect(feed.body).not.toEqual('');
            expect(feed.image).not.toEqual('');
            expect(feed.publisher).not.toEqual('');
            expect(feed.source).not.toEqual('');
        });
    });
});