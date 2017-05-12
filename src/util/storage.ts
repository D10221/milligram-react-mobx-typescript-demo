import * as storage from "electron-json-storage";

export const getItem = <T extends {}>(key: string) => new Promise<T>((resolve, reject) => {
    storage
        .get(key, (error, data) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(data as T);
        });
});

export const setItemAsync = (key: string, data: any) => new Promise<void>((resolve, reject) => {
    storage
        .set(key, data, (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
});

export const setItem = (key: string, data: any, onError?: (e: Error) => void) => {
    storage.set(key, data, onError || (e => { if (e) { throw e; } }));
};