import * as  electron from "electron";
import * as path from "path";
export const getAppPath = (...segments: string[]) => {
    const _path = (Array.isArray(segments)) ? path.join(...segments) : segments;
    return path.isAbsolute(_path) ? _path :
        path.resolve(electron.app.getAppPath(), _path);
};