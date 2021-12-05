export interface Logger {
    LogInfo(message: string, params: string[]): void;
    LogWarning(message: string, params: string[]): void;
    LogError(message: string, params: string[]): void;
}