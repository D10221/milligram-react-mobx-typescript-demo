import * as winston from "winston";
import { TransportInstance } from "winston";

require("winston-daily-rotate-file");
import * as path from "path";
// import * as fs from "fs";

import { getPackage } from "./package";
import { root } from "./root";

export type TransportType = "file" | "console";
export const LogFolder = "logs";
const defaultTransports: TransportType[] = ["file", "console"];

/**
 *
 */
export function filePath(directory: string, loggerName: string): string {
    const environment = process.env.NODE_ENV || "production";
    const fileName = `${loggerName}.${environment}.log`;
    return path.join(directory, fileName);
}

/**
 *
 */
function initialize(
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

let _logger: winston.LogMethod;

/**
 * current
 */
export const getCurrentLogger = (name?: string | null, level?: string|null, transports?: TransportType[]) => {
    if (_logger) { return _logger; }
    _logger = getLogger(name, level, transports);
    return _logger;
};

/**
 * get new
 */
export const getLogger = (
    name?: string | null,
    level?: string | null,
    transports?: TransportType[]): winston.LogMethod => {

    // const directory = path.join(root, LogFolder);
    // if (!fs.exists(directory)) {
    //     fs.mkdirSync(directory);
    // }

    return initialize(
        filePath(root, name || getPackage(root).package.name),
        level || "info",
        transports || defaultTransports);
};
