import * as winston from "winston";
import { root } from "../root";
import { TransportType, defaultTransports } from "./types";
import { current as rootPackage } from "../package";
import { filePath } from "./file-path";
import { initialize } from "./initialize";
/**
 * get new
 */
export const getLogger = (
    name?: string | null,
    level?: string | null,
    transports?: TransportType[]): winston.LogMethod => {
    return initialize(
        filePath(root, name || rootPackage.value.package.name),
        level || "info",
        transports || defaultTransports);
};
