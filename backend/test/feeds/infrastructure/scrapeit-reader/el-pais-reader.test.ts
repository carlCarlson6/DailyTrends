import { It, Mock } from "moq.ts";
import { Logger } from "../../../../src/feeds/domain/services/logger";
import { ElPaisReader } from "../../../../src/feeds/infrastructure/scrapeit-reader/el-pais-reader";

describe("El Pais reader", () => {
    const loggerMock = new Mock<Logger>();
    const reader = new ElPaisReader(loggerMock.object());

    beforeEach(() => {
        loggerMock.setup(l => l.LogInfo(It.IsAny<string>(), It.IsAny<string[]>())).returns();
        loggerMock.setup(l => l.LogWarning(It.IsAny<string>(), It.IsAny<string[]>())).returns();
        loggerMock.setup(l => l.LogError(It.IsAny<string>(), It.IsAny<string[]>())).returns();
    });

    it("when Read then retuns 5 articles with all the fields", async () => {
        const feeds = await reader.Read();
        
        expect(feeds).not.toBeNull();
        expect(feeds).toHaveLength(5);

        feeds.forEach(feed => {
            expect(feed.Title).not.toEqual('');
            expect(feed.Body).not.toEqual('');
            expect(feed.Image).not.toEqual('');
            expect(feed.Publisher).not.toEqual('');
            expect(feed.Source).not.toEqual('');
        });
    });
});