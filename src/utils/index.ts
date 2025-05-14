export enum LogLevel {
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

export const logger = (level: LogLevel, resolver: string, message: string) => {
  console[level](JSON.stringify({ level, resolver, message }));
};
