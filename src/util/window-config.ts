import * as fs from "fs";
import { tryGet } from "./try-get";
import { getPath } from "./local-path";
import { getProcessArgs } from "./process-args";
import {orDefault} from "./or-default";

export const windowConfig = tryGet<Electron.BrowserWindowOptions>(
    () => JSON.parse(
        fs.readFileSync(
            getPath(getProcessArgs("--config") || "window.config.json"),
            "utf-8")),
        /* or */ {}
);

windowConfig.width = orDefault(windowConfig.width, 600);
windowConfig.height = orDefault(windowConfig.height, 600);
windowConfig.autoHideMenuBar = orDefault(windowConfig.autoHideMenuBar, true);
windowConfig.icon = orDefault(windowConfig.icon, getPath("resources", "favicon.ico"));
windowConfig.show = false;
