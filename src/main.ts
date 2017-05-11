import * as electron from "electron";
import * as path from "path";
import * as url from "url";
import * as util from "util";
import * as fs from "fs";

import { create as createTray } from "./tray";

const hasFlag = (flag: string) => typeof flag === "string" && process.argv.indexOf(flag) !== -1;

// Module to control application life.
const app = electron.app;

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow;
let tray: Electron.Tray;

const orDefault = <T>(value: T, defaultValue: T) => !util.isNullOrUndefined(value) ? value : defaultValue;

const tryGet = <T>(getter: () => T, defaultValue: T) => {
    try {
        return getter();
    } catch (e) {
        console.log(e);
        return defaultValue;
    }
};

function createWindow() {

    // window.config: orDefault
    const config = tryGet<Electron.BrowserWindowOptions>(
        () => JSON.parse(
                fs.readFileSync(
                    path.join(process.cwd(), "window.config.json"),
                    "utf-8")),
        /* or */ {}
    );

    config.autoHideMenuBar = orDefault(config.autoHideMenuBar, true);
    config.width = orDefault(config.width, 600);
    config.height = orDefault(config.height, 600);
    config.titleBarStyle = orDefault(config.titleBarStyle, "hidden");
    config.icon = orDefault(config.icon, path.join(process.cwd(), "resources", "favicon.ico"));
    config.show = false;

    // Create the browser window.
    mainWindow = new BrowserWindow(
        config
    );
    // and load the index.html of the app.
    mainWindow.loadURL(
        url.format({
            pathname: path.join(process.cwd(), "window.html"),
            protocol: "file:",
            slashes: true
        })
    );
    // Open the DevTools.
    if (process.env.OPEN_DEV_TOOLS || hasFlag("--dev-tools")) {
        mainWindow.webContents.openDevTools();
    }
    // Emitted when the window is closed.
    mainWindow.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
    mainWindow.on("ready-to-show", () => {
        mainWindow.show();
        if (hasFlag("--maximize")) {
            mainWindow.maximize();
        }
        tray = createTray({ window: mainWindow });
    });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
    createWindow();

});
// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.