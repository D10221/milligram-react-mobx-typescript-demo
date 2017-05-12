export const isString = (x: any): x is string => {
    return typeof x === "string";
};

export const isNullOrUndefined = (x: any): boolean => {
    return "undefined" === typeof x || x === null;
};