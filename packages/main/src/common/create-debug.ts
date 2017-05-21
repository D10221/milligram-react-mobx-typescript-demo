import * as createDebug from "debug";
import {getPackage} from "./package";

export const CreateDebug = (submodule: string) =>
    createDebug(`${getPackage().name}:${submodule}`);