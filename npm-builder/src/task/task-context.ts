import { Package } from "../package/Package";
import { isNullOrUndefined as isNull } from "util";
import { ArgsQuery } from "../args/query";
import { TaskContext } from "./TaskContext";
export const taskContext = (
    taskName: string,
    args: ArgsQuery,
    packageSelection: Package[]): TaskContext => {
    // ...
    const enabled = args.hasFlag(taskName);
    const list = args.GetFlagAsList(taskName);
    const all = !list.length;
    const isSelectedForPackage = (pkg: Package) => {
        return all || !isNull(list.find(x => x === pkg.name));
    };
    const isDependency = (pkg: Package) => {
        return !isNull(
            packageSelection
                .map(x => Object.keys(x.dependencies)).reduce((c, n) => {
                return c.concat(n)
            })
            .find(x => x === pkg.name )
        );
    }
    if (enabled) console.log(`${taskName}: ${all ? "all" : list.join(",")}`);
    return {
        isSelectedForPackage,
        enabled,
        args,
        packageSelection,
        isDependency
    };
};