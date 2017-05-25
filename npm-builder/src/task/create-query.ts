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

    /**
     * redundant when created by name   ,
     * TODO: use as filter remove other filters   
     */
    const isEnabled = (_pkg: Package) => {
        return context.args.GetFlagAsList("task").indexOf(context.taskName) !== -1;
    }

    const ignoreDependencies = (_pkg?: Package) => {
        if(context.taskName === "build"){
            return false;
        }
        //TODO:
        return true;
    }

    return {
        isSelectedForPackage,
        isDependency,
        taskEnabledsDesc,
        isEnabled,
        ignoreDependencies
    }
}