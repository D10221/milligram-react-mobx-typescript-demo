import * as url from "url";
import * as path from "path";

/**
 * format as file protocol, relative to cwd
 */
export const getFileUrl = (_path: string) => {
    return url.format({
        pathname: path.join(process.cwd(), _path),
        protocol: "file:",
        slashes: true
    });
};
