import * as createDebug from "debug";

let _packageName: string;
const packageName = () => _packageName || (() => {
    _packageName = (require("../package.json").name);
    return _packageName;
})();

export const CreateDebug = (submodule: string) =>
    createDebug(`${packageName()}:${submodule}`);