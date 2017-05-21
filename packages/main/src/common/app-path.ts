import * as  electron from "electron";
import * as path from "path";
import { CreateDebug } from "./create-debug";
const debug = CreateDebug("get-app-path");

export const appPath = process.env.ELECTRON_NO_ASAR !== "1"
    ? electron.app.getAppPath()
    : process.cwd();

debug(appPath);

export const resolvePath = (...segments: string[]) => {
    const _path = (Array.isArray(segments)) ? path.join(...segments) : segments;
    return path.isAbsolute(_path) ? _path :
        path.resolve(appPath, _path);
};
