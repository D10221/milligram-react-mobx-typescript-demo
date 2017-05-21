
import * as url from "url";
// import * as path from "path";
import * as electron from "electron";
import { WindowStateManager, Subscription, subscribe, IWindowStateManager } from "electron-window-state";
import { WindowConfig, windowConfig } from "./window-config";
import { CreateDebug } from "../common/create-debug";
import { isWindowAlive } from "electron-window-state";
import { toggleDevTools as _toggleDevTools } from "./toggle-dev-tools";
import { resolvePath } from "../common/app-path";
const debug = CreateDebug("create-window");

let isFirstRun = true;
export interface MainWindow {
    reload(): void;
    dispose(): void;
    focus(): void;
    create(): void;
    toggleDevTools(): void;
}

export const CreateWindow = (configuration?: WindowConfig, windowState?: IWindowStateManager) => {
    // dependencies
    const config: WindowConfig = {};
    Object.assign(
        config,
        windowConfig,
        configuration);

    // WARNING: resolve path: asar vs fs
    // when running on electron-prebuilt
    // relative paths are not a problem
    // but once built/packaged
    // doesn't reolve by it self
    config.index = resolvePath(config.index);

    // resolve path: asar vs fs
    if (typeof config.icon === "string") {
        config.icon = resolvePath(config.icon);
    }

    windowState = windowState || WindowStateManager("main-window");

    // tiny validation
    if (config.titleBarStyle && config.frame) {
        debug("titleBarStyle & frame should not be used together");
    }

    // instance reference
    let subscription: Subscription;
    let window: Electron.BrowserWindow;

    const dispose = () => {
        if (isWindowAlive(window)) {
            if (subscription) {
                subscription.unsubscribe();
                subscription = null;
            }
            window.removeAllListeners();
            window = null;
        }
    };

    const onReadyToShow = () => {
        window.show();
        if (isFirstRun && config.maximize) {
            window.maximize();
        }
        isFirstRun = false;
    };

    const onClose = (e: Event) => {
        e.preventDefault();
        dispose();
    };

    const create = () => {
        window = new electron.BrowserWindow(config);

        // Subscribe
        window.on("closed", onClose);
        window.on("ready-to-show", onReadyToShow);
        window.on("unresponsive", (...args: any[]) => {
            console.log(args);
        });
        window.on("did-fail-load'", (...args: any[]) => {
            console.log(args);
        });

        // load the index.html of the app.
        // from current directory
        // assuming this was built to the same location
        // as you placed your "index.html"
        // TODO: option/parameter
        window.loadURL(
            url.format({
                pathname: config.index,
                protocol: "file:",
                slashes: true
            })
        );

        if (subscription) { subscription.unsubscribe(); }
        subscription = // it does also restore, TODO:
            // create subscription and subscribe
            // eventually'll'be replaced with rxjs
            subscribe(windowState)(window);

        // Open the DevTools. on Start
        // Warning: this is also done by window STate ?
        if (isFirstRun && config.openDevTools) {
            window.webContents.openDevTools();
        }
    };

    const reload = () => {
        if (!isWindowAlive(window)) {
            create();
            return;
        }
        window.reload();
    };

    const toggleDevTools = () => _toggleDevTools(window);

    const focus = () => {
        if (isWindowAlive(window)) {
            window.focus();
            return;
        }
        create();
    };

    const sendError = (error: Error) => {
        if (isWindowAlive(window)) {
            window.webContents.send("error:main", {
                stack: error.stack,
                message: error.message,
                name: error.name,
            });
        }
    };
    // ...
    return {
        sendError,
        create,
        dispose,
        reload,
        focus,
        toggleDevTools
    };
};