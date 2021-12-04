export class Feed {
    constructor(    
        readonly id: string,
        readonly title: string,
        readonly body: string,
        readonly image: string,
        readonly source: string,
        readonly publisher: string
    ) { }
}
