import { Logger } from "../domain/services/logger";

export class ConsoleLogger implements Logger {
    LogInfo(message: string, params: string[]): void {
        throw new Error("Method not implemented.");
    }
    LogWarning(message: string, params: string[]): void {
        throw new Error("Method not implemented.");
    }
    LogError(message: string, params: string[]): void {
        throw new Error("Method not implemented.");
    }
}
