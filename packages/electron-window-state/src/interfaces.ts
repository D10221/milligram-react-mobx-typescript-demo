export interface StateData {
    fullScreen: boolean;
    devToolsOpened: boolean;
    bounds: Electron.Rectangle;
}

export interface Subscription {
    disposed: boolean;
    unsubscribe: () => void ;
}
export interface IWindowStateManager {
    set(window: Electron.BrowserWindow): Promise<void>;
    get(): Promise<StateData>;
    restore(window: Electron.BrowserWindow): void;
    save(): Promise<void>;
    reset(): Promise<void>;
    update(window: Electron.BrowserWindow, key?: keyof StateData): Promise<void>;
}