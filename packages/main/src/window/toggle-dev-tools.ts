import {  isWindowAlive,  } from "electron-window-state";
export type BrowserWindow = Electron.BrowserWindow;
export const toggleDevTools = (window: BrowserWindow) => {
    if (!isWindowAlive(window)) { return; }
    if (window.webContents.isDevToolsOpened()) {
        window.webContents.closeDevTools();
    } else {
        window.webContents.openDevTools();
    }
};