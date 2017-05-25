import * as shell from "shelljs";
import { Package } from "../package/Package";
import { TaskContext } from "../task";
import { createQuery } from "./create-query";

export const createTask = (context: TaskContext) => {

    const query = createQuery(context);

    if (query.isEnabled()) console.log(
        query.taskEnabledsDesc()
    );

    const run = (pkg: Package) => {

        if (!query.isEnabled(pkg)) return "disabled";

        let ok = "completed";
        if (!query.isSelectedForPackage(pkg)) {
            if (query.ignoreDependencies(pkg) ||
                !query.isDependency(pkg)) return "unselected";
            ok = "dependency";
        }

        if (shell.exec(`npm run ${context.taskName}`).code !== 0) {
            throw new Error(`Can't ${context.taskName} ${pkg.name}`);
        }

        return ok;
    };

    return { name: context.taskName, run };
};