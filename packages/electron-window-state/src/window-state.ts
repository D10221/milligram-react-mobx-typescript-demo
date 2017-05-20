import * as util from "util";
import { isWindowAlive } from "./is-window-alive";
import { Store } from "electron-json-storage-async";
import { StateData, IWindowStateManager } from "./interfaces";

const storage = Store<any>("main-window");
export const WindowStateManager = (windowName: string, onError?: (e: Error) => void): IWindowStateManager => {

    let currentState: StateData = {} as any;

    const storeKey = `window_${windowName}`;

    onError = onError || ((e) => {
        console.error(e);
    });

    const saveState = () => {
        return storage.set(storeKey, currentState);
    };

    const update = (window: Electron.BrowserWindow, key?: keyof StateData) => {
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

        return saveState();
    };

    const set = (window: Electron.BrowserWindow) => {

        if (!isWindowAlive(window)) {
            return Promise.resolve();
        }

        const newState: StateData = {} as any;
        newState.fullScreen = window.isFullScreen();

        if (!newState.fullScreen) {
            currentState.bounds = window.getBounds();
        }
        return saveState();
    };

    const get = (): Promise<StateData> => {
        return storage.get(storeKey);
    };

    const restore = (window: Electron.BrowserWindow) => {
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
        return saveState();
    };

    return { set, get, restore, save: saveState, reset, update };
};