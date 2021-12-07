import { injectable } from "inversify";
import { Logger } from "../domain/services/logger";

@injectable()
export class ConsoleLogger implements Logger {
    LogInfo(message: string, params: string[]): void {
        console.log(message, params);
    }
    LogWarning(message: string, params: string[]): void {
        console.warn(message, params);
    }
    LogError(message: string, params: string[]): void {
        console.error(message, params);
    }
}
