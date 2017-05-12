import * as path from "path";
import * as fs from "fs";

/**
 * require json file relative to route
 */
export const requireJson = (_path: string) => {
    return JSON.parse(
        fs.readFileSync(
            path.join(
                process.cwd(),
                /\.[a-z-A-Z]+$/.test(_path) ? _path : `${_path}.json`
            ),
            "utf-8"
        )
    );
};
export const requirejsonAsync = <T>(_path: string) => {
    return new Promise<T>((resolve, reject) => {
        fs.readFile(
            path.join(
                process.cwd(),
                /\.[a-z-A-Z]+$/.test(_path) ? _path : `${_path}.json`
            ), "utf-8",
            (err, json) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(JSON.parse(json));
            }
        );
    });
};