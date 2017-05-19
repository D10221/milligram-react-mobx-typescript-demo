import * as util from "util";
import { isWindowAlive } from "./is-window-alive";
import * as storage from "./storage";
export type BrowserWindow = Electron.BrowserWindow;
export interface StateData {
    fullScreen: boolean;
    devToolsOpened: boolean;
    bounds: Electron.Rectangle;
}

export const WindowStatePersistence = (windowName: string, onError?: (e: Error) => void) => {

    let currentState: StateData = {} as any;

    const storeKey = `window_${windowName}`;

    onError = onError || ((e) => {
        console.error(e);
    });

    const saveState = () => {
        return storage.setItem(storeKey, currentState, onError);
    };

    const update = (window: BrowserWindow, key?: keyof StateData) => {
        switch (key) {
            case "devToolsOpened": {
                currentState.devToolsOpened = window.webContents.isDevToolsOpened();
                break;
            }
            case "fullScreen": {
                currentState.fullScreen = window.isFullScreen();
                break;
            }
            case "bounds": {
                currentState.bounds = window.getBounds();
                break;
            }
            default: {
                throw new Error("Key Not Found: " + key);
            }
        }

        saveState();
    };

    const set = (window: BrowserWindow) => {

        if (!isWindowAlive(window)) {
            return;
        }

        const newState: StateData = {} as any;
        newState.fullScreen = window.isFullScreen();

        if (!newState.fullScreen) {
            currentState.bounds = window.getBounds();
        }
        saveState();
    };

    const get = (): Promise<StateData> => {
        return storage.getItem<StateData>(storeKey);
    };

    const restore = (window: BrowserWindow) => {
        return get().then(state => {
            if (state && (state.bounds || !util.isNullOrUndefined(state.fullScreen))) {
                if (!state.fullScreen) {
                    window.setBounds(state.bounds);
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

    return { set, get, restore, save: saveState, reset, update };
};