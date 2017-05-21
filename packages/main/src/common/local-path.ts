import * as path from "path";
export const getPath = (...segments: string[]) => {
    const _path = (Array.isArray(segments)) ? path.join(...segments) : segments;
    return path.isAbsolute(_path) ? _path :
        path.join(process.cwd(), _path);
};
