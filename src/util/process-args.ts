export const getProcessArgs = (key: string) => {
    const index = process
        .argv.indexOf(key);
    if (index === -1) {
        return null;
    }
    return process.argv[index + 1];
};