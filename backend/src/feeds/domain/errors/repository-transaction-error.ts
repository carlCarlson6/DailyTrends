export class RepositoryTransactionError extends Error {
    constructor(message: string) {
        super(`repository transaction failed - ${message}`);
        Object.setPrototypeOf(this, RepositoryTransactionError.prototype);
    }
}