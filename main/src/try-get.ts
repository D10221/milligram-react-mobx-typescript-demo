export const tryGet = <T>(getter: () => T, defaultValue: T, onError?: (e: Error) => void) => {
    onError = onError || ((e) => console.error(e));
    try {
        return getter();
    } catch (e) {
        onError(e);
        return defaultValue;
    }
};