import { IWindowStateManager } from "./interfaces";

export const subscribe = (windowState: IWindowStateManager) => (mainWindow: Electron.BrowserWindow) => {
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
    return {
        unsubscribe: () => {
            mainWindow.removeListener("resize", onWindowStateChanged);
            mainWindow.removeListener("move", onWindowStateChanged);
            mainWindow.webContents.removeListener("devtools-opened", onDevToolsStateChanged);
            mainWindow.webContents.removeListener("devtools-closed", onDevToolsStateChanged);
        }
    };
};