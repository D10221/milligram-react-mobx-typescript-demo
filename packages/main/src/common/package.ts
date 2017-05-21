import * as path from "path";
import { ElectronPackage } from "./electron-package";

let _pkg: ElectronPackage;
export const getPackage = (): ElectronPackage => {
    if (_pkg) { return _pkg; }
    _pkg = require(path.resolve(process.cwd(), "package.json"));
    return _pkg;
};