export const hasFlag = (arg: string) => process.argv.indexOf(arg) !== -1;

export const getFlag = (x: string, defaultValue?: string) => {
    const i = process.argv.indexOf(x);
    if (i === -1) { return null; }
    const value = process.argv[i + 1];
    return !value || value.trim() === "" ? defaultValue : value;
};