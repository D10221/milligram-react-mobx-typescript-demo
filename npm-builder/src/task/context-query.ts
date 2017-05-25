import { TaskContext } from "./TaskContext";
import { isNullOrUndefined as isNull } from "util";
import { Package } from "../package/Package";

export const ContextQuery = (context: TaskContext) => {
    const list = context.args.GetFlagAsList(context.taskName);
    const all = !list.length;
    const isSelectedForPackage = (pkg: Package) => {
        return all || !isNull(list.find(x => x === pkg.name));
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

    const enabledPakagesDesc = () => {
        return `${context.taskName}: ${all ? "all" : list.join(",")}`;
    }

    const isEnabled = (_pkg: Package) => {
        return context.enabled;
    }

    const ignoreDependencies = (_pkg?: Package) => {
        return context.taskName !== "build";
    }

    return {
        isSelectedForPackage,
        isDependency,
        enabledPakagesDesc,
        isEnabled,
        ignoreDependencies
    }
}