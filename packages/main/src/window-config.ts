import * as fs from "fs";
import { tryGet } from "./try-get";
import { getPath } from "./local-path";
import { flagValue } from "./process-args";
import { orDefault } from "./or-default";
import { isDarwin } from "./platform";

import { hasFlag } from "./process-args";
export interface WindowConfig extends Electron.BrowserWindowOptions {
    maximize?: boolean;
    openDevTools?: boolean;
}

export const windowConfig = tryGet<WindowConfig>(
    () => JSON.parse(
        fs.readFileSync(
            getPath(flagValue("--config") || "window.config.json"),
            "utf-8")),
        /* or */ {}
);

windowConfig.maximize = hasFlag("--maximize");
windowConfig.openDevTools = process.env.OPEN_DEV_TOOLS || hasFlag("--dev-tools");
windowConfig.width = orDefault(windowConfig.width, 600);
windowConfig.height = orDefault(windowConfig.height, 600);
windowConfig.autoHideMenuBar = orDefault(windowConfig.autoHideMenuBar, true);
windowConfig.icon = orDefault(windowConfig.icon, getPath("resources", "favicon.ico"));
windowConfig.titleBarStyle = orDefault(windowConfig.titleBarStyle, !isDarwin ? "hidden" : "default");
windowConfig.show = false;
