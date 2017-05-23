import * as shell from "shelljs";
import { Package } from "./Package";
import { ArgsQuery } from "../args";
import { BuildConfig } from "../config/BuildConfig";

const getList = (args: ArgsQuery, config: BuildConfig) => {
    const _list = args.GetFlagAsList("clean");
    return !args.hasFlag("clean") ? [] : _list.length > 0 ? _list : config.packages.map(x => x.name);
};

export const clean = (args: ArgsQuery, config: BuildConfig) => {

    const list = getList(args, config);

    return (pkg: Package) => {
        const name = list.find(x => x === pkg.name);
        if (name) {
            console.log("clean: " + pkg.name);
            if (shell.exec("npm run clean").code !== 0) {
                throw new Error("Can't clean " + pkg.name);
            }
        }
    };
};