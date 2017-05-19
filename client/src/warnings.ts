const isProduction = process.env.NODE_ENV !== "production";
if (!isProduction) {
    console.warn("this code might hurt you liver");
}

/**
 * @deprecated use "debug" @see "/notes.md";
 */
export const warn = (...args: any[]) => {
    if (!isProduction) {
        console.warn(args);
    }
};