import * as path from "path";
export const getPath = ($path: string) => {
    return path.isAbsolute($path) ? $path :
        path.join(process.cwd(), $path);
};
