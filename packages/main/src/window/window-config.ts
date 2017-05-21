import * as util from "util";
import * as fs from "fs";
import * as path from "path";
import { getAppPath } from "../common/get-app-path";
import { hasFlag, flagValue } from "../common/process-args";
import { isDarwin, isWindows } from "../common/platform";
import { getPackage } from "../common/package";
export interface WindowConfig extends Electron.BrowserWindowOptions {
    maximize?: boolean;
    openDevTools?: boolean;
    index?: string;
}

const getWindowConfig = (_path: string) => util.isString(_path) ?
    JSON.parse(
        fs.readFileSync(
            getAppPath(_path),
            "utf-8")) : {};

export const windowConfig: WindowConfig = {};
windowConfig.maximize = false;
windowConfig.openDevTools = false;
windowConfig.width = 600;
windowConfig.height = 600;
windowConfig.autoHideMenuBar = isWindows;

const favicon = path.resolve(process.cwd(), "favicon.ico");
if (fs.existsSync(favicon)) {
    windowConfig.icon = favicon;
}

windowConfig.titleBarStyle = !isDarwin ? "hidden" : "default";
windowConfig.show = false;

const index = path.resolve(process.cwd(), "index.html");
windowConfig.index = index;

const fromPkg = getPackage().window;

const fromConfig = getWindowConfig(flagValue("--config"));

Object.assign(
    windowConfig,
    fromPkg,
    fromConfig
);

if (hasFlag("--maximize")) {
    windowConfig.maximize = true;
}
if (hasFlag("--dev-tools")) {
    windowConfig.openDevTools = true;
}