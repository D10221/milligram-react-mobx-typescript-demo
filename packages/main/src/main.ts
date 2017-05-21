import * as electron from "electron";

/**
 * It doesn work: yet....
 */
process.on("uncaughtException", (error: Error) => {
    console.error(error);
    if (mainWindow) {
        mainWindow.sendError(error);
    }
});

import { CreateTray } from "./tray/create-tray";
import { Tray } from "./tray/interfaces";
import { CreateWindow } from "./window/create-window";

const app = electron.app;
const mainWindow = CreateWindow({
    index: "./built/index.html",
    icon: "./resources/favicon.ico",
});

if (app.makeSingleInstance((_commandLine: any[], _workingDirectory: string) => mainWindow.focus())) {
    app.quit();
}

let _tray: Tray;
const getTray = async () => {
    if (_tray) { return _tray; }
    return (_tray = await CreateTray({
        // label: displayName,
        // toolTip: description,
        // icon: "resources/icon-16x16.png",
    }).then(f => f(mainWindow)));
};

const onReady = async () => {
    try { // WARNING: not catching wrong index|icon
        mainWindow.create();
    } catch (e) {
        console.error(e);
        app.quit();
    }
    await getTray();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", onReady);

const onAllWindowClosed = async () => {
    if ((await getTray()).canQuit()) {
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
