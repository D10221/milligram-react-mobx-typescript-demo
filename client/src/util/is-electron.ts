// credits: https://github.com/cheton/is-electron
// https://github.com/cheton/is-electron/blob/master/index.js
// https://github.com/electron/electron/issues/2288
export function isElectron() {

    if (typeof window !== "undefined" && (window as any).process && (window as any).process.type === "renderer") {
        return true;
    }
    if (typeof process !== "undefined" && process.versions && !!process.versions.electron) {
        return true;
    }
    return false;
}