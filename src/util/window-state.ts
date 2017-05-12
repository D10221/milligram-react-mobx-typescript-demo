import * as util from "util";
import { isWindowAlive } from "./is-window-alive";
import * as storage from "./storage";
export type BrowserWindow = Electron.BrowserWindow;
export type State = { fullScreen: boolean, devToolsOpened: boolean } & Electron.Rectangle;
/**
 * TODO: reset()
 */
export const WindowState = (windowName: string, onError?: (e: Error) => void) => {

    onError = onError || ((e) => {
        console.error(e);
    });

    const set = (window: BrowserWindow) => {
        if (!isWindowAlive(window)) {
            return;
        }
        const fullScreen = window.isFullScreen();
        storage.setItem(`window:${windowName}:full-screen`, fullScreen, onError);
        storage.setItem(`window:${windowName}:dev-tools-opened`, window.webContents.isDevToolsOpened());
        if (fullScreen) {
            return;
        }
        storage.setItem(`window:${windowName}:bounds`, window.getBounds());
    };

    const get = async (): Promise<State> => {
        const { x, y, width, height } = (await storage.getItem<Electron.Rectangle>(`window:${windowName}:bounds`));
        const fullScreen = (await storage.getItem<boolean>(`window:${windowName}:full-screen`));
        const devToolsOpened = await storage.getItem<boolean>(`window:${windowName}:dev-tools-opened`);
        return {
            x, y, width, height, fullScreen, devToolsOpened
        };
    };

    const restore = (window: BrowserWindow) => {
        console.log(window.id);
        return get().then(state => {
            if (state && state.width && state.height) {
                if (!state.fullScreen) {
                    const { x, y, width, height } = state;
                    window.setBounds({ x, y, width, height });
                } else {
                    window.setFullScreen(true);
                }
                if (!util.isNullOrUndefined(state.devToolsOpened) && state.devToolsOpened) {
                    window.webContents.openDevTools();
                }
            }
        });
    };

    return { set, get, restore };
};