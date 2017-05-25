import * as shell from "shelljs";
import { Package } from "./Package";
import { TaskContext } from "../task";


export const Build = (context: TaskContext) => {
    const { enabled, isSelectedForPackage, isDependency } = context;
    const run = (pkg: Package) => {
        if (!enabled) return "disabled";
        let ok = "completed";
        if (!isSelectedForPackage(pkg)) {
            if (!isDependency(pkg)) return "unselected";
            ok = "dependency";
        }
        ;
        if (shell.exec(`npm run build`).code !== 0) {
            throw new Error(`package ${pkg.name} build failed`);
        }
        return ok;
    };
    return {
        name: "build",
        run
    };
};