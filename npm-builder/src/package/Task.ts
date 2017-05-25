import { Package } from "./Package";
import { ArgsQuery } from "../args/query";
import { isNullOrUndefined as isNull } from "util";
export interface Task {
    name: string;
    run: (p: Package) => any;
}
export interface TaxContext {
    enabled: boolean;
    isSelectedForPackage: (p: Package) => boolean;
    args: ArgsQuery;
    packageSelection: Package[];
}
export const taxContex = (
    taskName: string,
    args: ArgsQuery,
    packageSelection: Package[]): TaxContext => {
    // ...
    const enabled = args.hasFlag(taskName);
    const list = args.GetFlagAsList(taskName);
    const all = !list.length;
    const isSelectedForPackage = (pkg: Package) => {
        return all || !isNull(list.find(x => x === pkg.name));
    };
    if (enabled) console.log(`${taskName}: ${all ? "all" : list.join(",")}`);
    return {
        isSelectedForPackage,
        enabled,
        args,
        packageSelection
    };
};