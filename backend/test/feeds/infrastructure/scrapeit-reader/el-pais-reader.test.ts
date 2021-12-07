import { ElPaisReader } from "../../../../src/feeds/infrastructure/scrapeit-reader/el-pais-reader";

describe("El Pais reader", () => {
    const reader = new ElPaisReader();

    it("when Read then retuns 5 articles with all the fields", async () => {
        const feeds = await reader.Read();
        
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