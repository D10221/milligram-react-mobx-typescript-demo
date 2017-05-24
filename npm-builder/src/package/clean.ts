import * as shell from "shelljs";
import { Package } from "./Package";
import { ArgsQuery } from "../args";
import { localPackages } from "./local-packages";

const getList = (args: ArgsQuery,  ) => {
    const _list = args.GetFlagAsList("clean");
    return _list.length > 0 ? _list : localPackages.map(x => x.name);
};

export const clean = (args: ArgsQuery,  ) => {

    const list = getList(args);

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