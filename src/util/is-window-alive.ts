import * as util from "util";
export type BrowserWindow = Electron.BrowserWindow;
export const isWindowAlive = (window: BrowserWindow) => {
    return !util.isNullOrUndefined(window) && !window.isDestroyed();
};
