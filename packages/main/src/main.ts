import * as electron from "electron";
import * as path from "path";
import { create as _createTray } from "./tray";
import { Store } from "electron-json-storage-async";
import { orDefault } from "./or-default";

import { isDarwin } from "./platform";
import { CreateWindow } from "./create-window";

const app = electron.app;

let tray: Electron.Tray;
const mainState = Store<any>("main");
const pkg = require(path.join(__dirname, "../", "package.json"));
const { displayName, description } = pkg;

const mainWindow = CreateWindow();

if (app.makeSingleInstance((_commandLine: any[], _workingDirectory: string) => mainWindow.focus())) {
    app.quit();
}

let dontQuit = isDarwin;
const canQuit = () => !dontQuit;
const toggleDontQuit = () => {
    dontQuit = !dontQuit;
    mainState.set("dont-quit", dontQuit);
};

const createTray = async () => {

    dontQuit = orDefault(
        (await mainState.get<boolean>("dont-quit")),
        dontQuit
    );

    const _tray = _createTray({ dontQuit, label: displayName, toolTip: description });
    _tray.on("reload", mainWindow.reload);
    _tray.on("dev-tools", mainWindow.toggleDevTools);
    _tray.on("dont-quit", toggleDontQuit);
    _tray.on("focus", mainWindow.focus);
    return _tray;
};

const onReady = async () => {
    mainWindow.create();
    if (!tray) {
        tray = await createTray();
    }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", onReady);

const onAllWindowClosed = () => {
    if (canQuit()) {
        app.quit();
    }
};

// Quit when all windows are closed.
// On OS X it is common for applications and their menu bar
// to stay active until the user quits explicitly with Cmd + Q
app.on("window-all-closed", onAllWindowClosed);

// On OS X it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
app.on("activate", mainWindow.focus);
