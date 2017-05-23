import * as path from "path";
export function filePath(directory: string, loggerName: string): string {
    const environment = process.env.NODE_ENV || "production";
    const fileName = `${loggerName}.${environment}.log`;
    return path.join(directory, fileName);
}
