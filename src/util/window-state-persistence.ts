import * as util from "util";
import { isWindowAlive } from "./is-window-alive";
import * as storage from "./storage";
export type BrowserWindow = Electron.BrowserWindow;
export type StateData = { fullScreen: boolean, devToolsOpened: boolean } & Electron.Rectangle & { [key: string]: any };

let currentState: StateData = {} as any;

export const WindowStatePersistence = (windowName: string, onError?: (e: Error) => void) => {

    const storeKey = `window_${windowName}`;

    onError = onError || ((e) => {
        console.error(e);
    });

    const saveState = () => {
        return storage.setItem(storeKey, currentState, onError);
    };

    const set = (window: BrowserWindow) => {

        if (!isWindowAlive(window)) {
            return;
        }

        currentState.fullScreen = window.isFullScreen();

        currentState.devToolsOpened = window.webContents.isDevToolsOpened();

        if (!currentState.fullScreen) {
            const bounds = window.getBounds();
            Object.assign(currentState, bounds);
        }

        return saveState(); // returning void, but could be a promise
    };

    const get = async (): Promise<StateData> => {
        currentState = (await storage.getItem<StateData>(storeKey));
        return currentState;
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

    const reset = () => {
        currentState = {} as any;
        saveState();
    };

    return { set, get, restore, save: saveState, reset };
};