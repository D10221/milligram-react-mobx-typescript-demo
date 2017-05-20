import * as electron from "electron";
import * as path from "path";
import * as url from "url";
import * as createDebug from "debug";
import { create as _createTray } from "./tray";
import { Store } from "electron-json-storage-async";

import { toggleDevTools } from "./toggle-dev-tools";
import { orDefault } from "./or-default";
import { windowConfig } from "./window-config";
// import { requireJson } from "./require-json";
import { isDarwin } from "./platform";
import { WindowStateManager, isWindowAlive, subscribe } from "electron-window-state";
// Initial State
const hasFlag = (flag: string) => typeof flag === "string" && process.argv.indexOf(flag) !== -1;
const openDevTools = process.env.OPEN_DEV_TOOLS || hasFlag("--dev-tools");
const maximize = hasFlag("--maximize");

let createWindowCount = 0;
const isFirstRun = () => {
    return createWindowCount === 0;
};

let dontQuit = isDarwin;
const canQuit = () => !dontQuit;

const windowState = WindowStateManager("main-window");
const app = electron.app;
let mainWindow: Electron.BrowserWindow;
let tray: Electron.Tray;
const mainState = Store<any>("main");
const debug = createDebug("app:main");
const pkg = require(path.join(__dirname, "../", "package.json"));
const { displayName, description } = pkg;

if (app.makeSingleInstance((_commandLine: any[], _workingDirectory: string) => {
    // someone tried to run a second instance, we should focus our window
    if (isWindowAlive(mainWindow)) {
        mainWindow.focus();
    }
    return true;
})) {
    app.quit();
}

const createTray = async () => {

    dontQuit = orDefault(
        (await mainState.get<boolean>("dont-quit")),
        dontQuit
    );

    const _tray = _createTray({ dontQuit, label: displayName, toolTip: description });

    _tray.on("reload", () => {
        if (!isWindowAlive(mainWindow)) {
            createWindow();
        } else {
            mainWindow.reload();
        }
    });

    _tray.on("dev-tools", () => {
        toggleDevTools(mainWindow);
    });

    _tray.on("dont-quit", () => {
        dontQuit = !dontQuit;
        mainState.set("dont-quit", dontQuit);
    });

    _tray.on("focus", () => {
        if (isWindowAlive(mainWindow)) {
            mainWindow.focus();
        } else {
            createWindow();
        }
    });

    return _tray;
};

function createWindow() {

    if (windowConfig.titleBarStyle && windowConfig.frame) {
        debug("titleBarStyle & frame should not be used together");
    }

    // Create the browser window.
    mainWindow = new electron.BrowserWindow(
        windowConfig
    );

    // and load the index.html of the app.
    mainWindow.loadURL(
        url.format({
            pathname: path.resolve(__dirname, "index.html"),
            protocol: "file:",
            slashes: true
        })
    );
    const subscription = // it does also restore, TODO:
        subscribe(windowState)(mainWindow);

    // Emitted when the window is closed.
    mainWindow.on("closed", (e: Event) => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        subscription.unsubscribe();
        mainWindow = null;
        e.preventDefault();
    });

    mainWindow.on("ready-to-show", () => {
        mainWindow.show();
        if (isFirstRun() && maximize) {
            mainWindow.maximize();
        }
        createWindowCount++;
    });

    // Open the DevTools. on Start
    if (openDevTools && isFirstRun()) {
        mainWindow.webContents.openDevTools();
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
    createWindow();
    if (!tray) {
        tray = await createTray();
    }
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (canQuit()) {
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
