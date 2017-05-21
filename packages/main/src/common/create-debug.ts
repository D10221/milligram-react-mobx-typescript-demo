import * as createDebug from "debug";

export const CreateDebug = (submodule: string) =>
    createDebug(`main:${submodule}`);