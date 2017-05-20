import { IWindowStateManager, Subscription } from "./interfaces";
import { isWindowAlive } from "./is-window-alive";

export const subscribe = (windowState: IWindowStateManager) =>
    // ...
    (mainWindow: Electron.BrowserWindow): Subscription => {
        // ...
        const onWindowStateChanged = () => {
            windowState.set(mainWindow);
        };
        const onDevToolsStateChanged = () => {
            windowState.update(mainWindow, "devToolsOpened");
        };
        mainWindow.on("resize", onWindowStateChanged);
        mainWindow.on("move", onWindowStateChanged);
        mainWindow.webContents.on("devtools-opened", onDevToolsStateChanged);
        mainWindow.webContents.on("devtools-closed", onDevToolsStateChanged);

        // Restore Last State
        windowState.restore(mainWindow);

        let disposed = false;
        return {
            disposed,
            unsubscribe: () => {
                if (disposed) {
                    // throw new Error("Already Unsubsribed");
                    return;
                }
                disposed = true;
                if (!isWindowAlive(mainWindow)) { return; }
                mainWindow.removeListener("resize", onWindowStateChanged);
                mainWindow.removeListener("move", onWindowStateChanged);
                mainWindow.webContents.removeListener("devtools-opened", onDevToolsStateChanged);
                mainWindow.webContents.removeListener("devtools-closed", onDevToolsStateChanged);
            }
        };
    };