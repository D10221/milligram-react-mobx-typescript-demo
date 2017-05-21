import * as path from "path";
import * as fs from "fs";
import { ElectronPackage } from "./electron-package";
import { appPath } from "./app-path";

let _pkg: ElectronPackage;
export const getPackage = (): ElectronPackage => {
    if (_pkg) { return _pkg; }
    _pkg = JSON.parse(
        fs.readFileSync(
            path.join(appPath, "package.json"),
            "utf-8"));
    return _pkg;
};