export class CreateFeedCommand {
    constructor(
        readonly title: string,
        readonly body: string,
        readonly image: string,
        readonly source: string,
        readonly publisher: string
    ) { }
}
