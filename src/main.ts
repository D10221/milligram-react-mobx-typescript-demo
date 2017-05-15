import * as electron from "electron";
import * as path from "path";
import * as url from "url";
import * as createDebug from "debug";
import { create as _createTray } from "./tray";
import { WindowStatePersistence } from "./util/window-state-persistence";
import { Persist } from "./util/persists";
import { isWindowAlive } from "./util/is-window-alive";
import { toggleDevTools } from "./util/toggle-dev-tools";
import { orDefault } from "./util/or-default";
import { windowConfig } from "./util/window-config";
import { requireJson } from "./util/require-json";
import { isDarwin } from "./util/platform";
// Initial State
const hasFlag = (flag: string) => typeof flag === "string" && process.argv.indexOf(flag) !== -1;
const openDevTools = process.env.OPEN_DEV_TOOLS || hasFlag("--dev-tools");
const maximize = hasFlag("--maximize");

let createWindowCount = 0;
const isFirstRun = () => {
    return createWindowCount === 0;
};

/**
 * On OS X it is common for applications and their menu bar
 * to stay active until the user quits explicitly with Cmd + Q
 * default value is MAC, then overwritten on 1st 'set'
 */
let dontQuit = isDarwin;
const canQuit = () => !dontQuit;

const windowState = WindowStatePersistence("main-window");
const app = electron.app;
let mainWindow: Electron.BrowserWindow;
let tray: Electron.Tray;
const mainState = Persist("main");
const debug = createDebug("app:main");
const pkg = requireJson("package");
const { displayName, description } = pkg;

const createTray = async () => {

    dontQuit = orDefault(
        (await (mainState.get<boolean>("dont-quit"))),
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
            pathname: path.join(process.cwd(), "window.html"),
            protocol: "file:",
            slashes: true
        })
    );

    // Emitted when the window is closed.
    mainWindow.on("closed", (e: Event) => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
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

    mainWindow.on("resize", () => {
        windowState.set(mainWindow);
    });

    mainWindow.on("move", () => {
        windowState.set(mainWindow);
    });

    mainWindow.webContents.on("devtools-opened", () => {
        windowState.update(mainWindow, "devToolsOpened");
    });

    mainWindow.webContents.on("devtools-closed", () => {
        windowState.update(mainWindow, "devToolsOpened");
    });

    // Restore Last State
    windowState.restore(mainWindow);

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
