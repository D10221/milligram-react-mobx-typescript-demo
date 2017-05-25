import * as shell from "shelljs";
import { Package } from "../package/Package";
import { TaskContext } from "../task";
import { ContextQuery } from "./context-query";

export const createTask = (context: TaskContext) => {

    const query = ContextQuery(context);

    if (context.enabled) console.log(
        query.enabledPakagesDesc()
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