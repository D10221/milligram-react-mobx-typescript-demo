import * as electron from "electron";
import * as path from "path";
import * as fs from "fs";
import { ElectronPackage } from "./electron-package";

let _pkg: ElectronPackage;
export const getPackage = (): ElectronPackage => {
    if (_pkg) { return _pkg; }
    _pkg = JSON.parse(fs.readFileSync(path.join(electron.app.getAppPath(), "package.json"), "utf-8"));
    return _pkg;
};