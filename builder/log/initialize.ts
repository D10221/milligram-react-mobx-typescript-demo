import * as winston from "winston";
import { TransportInstance } from "winston";
import { TransportType } from "./types";

require("winston-daily-rotate-file");

export const LogFolder = "logs";

export function initialize(
    path: string,
    logLevel: string,
    transportTypes?: TransportType[]): winston.LogMethod {
    // ...
    const fileLogger = new winston.transports.DailyRotateFile({
        filename: path,
        handleExceptions: false,
        json: false,
        datePattern: "yyyy-MM-dd.",
        prepend: true,
        level: logLevel,
    });

    const consoleLogger = new winston.transports.Console({
        level: process.env.NODE_ENV === "development" ? "debug" : "error",
    });
    const transports: TransportInstance[] = [];

    if (!transportTypes || transportTypes.indexOf("console") !== -1) {
        transports.push(consoleLogger);
    }

    if (!transportTypes || transportTypes.indexOf("file") !== -1) {
        transports.push(fileLogger);
    }

    winston.configure({
        transports,
    });

    return winston.log;
}
