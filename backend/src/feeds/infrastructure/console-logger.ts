import { injectable } from "inversify";
import { Logger } from "../domain/services/logger";

@injectable()
export class ConsoleLogger implements Logger {
    LogInfo(message: string, params: string[]): void {
        if (params.length === 0) {
            console.log(message);
        } else {
            console.log(message, params);
        }
    }
    LogWarning(message: string, params: string[]): void {
        console.warn(message, params);
        if (params.length === 0) {
            console.warn(message);
        } else {
            console.warn(message, params);
        }
    }
    LogError(message: string, params: string[]): void {
        if (params.length === 0) {
            console.error(message);
        } else {
            console.error(message, params);
        }
    }
}
