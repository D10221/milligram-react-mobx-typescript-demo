import * as storage from "./storage";
let state: any = {};

const _get = (storeName: string) => async <T>(key: string) => {
    state = await storage.getItem<T>(storeName);
    return state[key];
};
const _set = (storeName: string) => (key: string, value: any, onError?: (e: Error) => void) => {
    state[key] = value;
    storage.setItem(storeName, state, onError);
};

export const Persist = (storeName: string) => {
    return {
        get: _get(storeName),
        set: _set(storeName)
    };
};