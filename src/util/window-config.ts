import * as fs from "fs";
import { tryGet } from "./try-get";
import { getPath } from "./local-path";
import { getProcessArgs } from "./process-args";
export const windowConfig = tryGet<Electron.BrowserWindowOptions> (
    () => JSON.parse(
        fs.readFileSync(
            getPath(getProcessArgs("--config") || "window.config.json"),
            "utf-8")),
        /* or */ {}
);