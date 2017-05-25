import * as shell from "shelljs";
import { Package } from "../package/Package";
import { TaskContext } from "../task";
import { contextQuery } from "./context-query";

export const createTask = (context: TaskContext) => {

    const query = contextQuery(context);

    const isEnabled = query.isEnabled();

    if (isEnabled) console.log(
        query.taskEnabledsDesc()
    );

    const run = (pkg: Package) => {

        if (!isEnabled) return "disabled";

        const isDepedency =  query.isDependency(pkg);

        if (!query.isSelectedForPackage(pkg)) {
            return "unselected" + (isDepedency ? " [dependency]" : "");
        }

        if (shell.exec(`npm run ${context.taskName}`).code !== 0) {
            throw new Error(`Can't ${context.taskName} ${pkg.name}`);
        }

        return "completed" + (isDepedency ? " [dependency]" : "");
    };

    return { name: context.taskName, run };
};