export class QueryNotImplemented extends Error {
    constructor() {
        super("query not implemented");
        Object.setPrototypeOf(this, QueryNotImplemented.prototype);
    }
}