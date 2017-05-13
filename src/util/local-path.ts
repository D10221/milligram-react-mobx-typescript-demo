import * as path from "path";
export const getPath = (...$path: string[]) => {
    const _path = (Array.isArray($path)) ? path.join(...$path) : $path;
    return path.isAbsolute(_path) ? _path :
        path.join(process.cwd(), _path);
};
