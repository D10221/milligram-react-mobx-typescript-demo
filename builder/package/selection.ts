
import { Package } from "./interfaces";
import { ArgsQuery } from "../args";
import { BuildConfig } from "../config/interfaces";

export const getSelection = (args: ArgsQuery, config: BuildConfig): Package[] => {
    const list = args.getParamAsList();
    const selection = !list.length ? config.packages
        : config.packages.filter(p => list.indexOf(p.name) !== -1);
    if (!selection.length) {
        throw new Error("Package Selection Empty");
    }
    return selection;
};
