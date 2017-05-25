import { TaskContext } from "./TaskContext";
import { isNullOrUndefined as isNull } from "util";
import { Package } from "../package/Package";
import { ContextQuery } from "./context-query";

export const createQuery = (context: TaskContext): ContextQuery => {

    const list = context.args.GetFlagAsList(context.taskName);

    const any = !list.length;

    const isSelectedForPackage = (pkg: Package) => {
        return any || !isNull(list.find(x => x === pkg.name));
    };

    const isDependency = (pkg: Package) => {
        return !isNull(
            context.packageSelection
                .map(x => Object.keys(x.dependencies)).reduce((c, n) => {
                    return c.concat(n)
                })
                .find(x => x === pkg.name)
        );
    }

    const taskEnabledsDesc = (_pkg?: Package) => {
        return `${context.taskName}: ${any ? "any" : list.join(",")}`;
    }

    const isEnabled = (_pkg: Package) => {
        return context.args.GetFlagAsList("task").indexOf(context.taskName) !== -1;
    }

    const ignoreDependencies = (_pkg?: Package) => {
        return context.taskName !== "build";
    }

    return {
        isSelectedForPackage,
        isDependency,
        taskEnabledsDesc,
        isEnabled,
        ignoreDependencies
    }
}