import * as winston from "winston";
import { TransportType } from "./types";
import { getLogger } from "./get-logger";

let _logger: winston.LogMethod;

/**
 * current
 */
export const getCurrentLogger = (name?: string | null, level?: string | null, transports?: TransportType[]) => {
    if (_logger) { return _logger; }
    _logger = getLogger(name, level, transports);
    return _logger;
};
