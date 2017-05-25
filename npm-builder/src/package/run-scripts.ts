import * as shell from "shelljs";
import { Package } from "./Package";
import { isNullOrUndefined as isNull } from "util";
import { TaskContext } from "../task";

/**
 * Script NAMES
 */
export const RunScripts = (config: TaskContext) => {
    const { enabled, args } = config;

    const selection = args.GetFlagAsList("runScripts");

    const isSelected = (scriptName: string) => !isNull(
        selection.find(x => x === scriptName)
    );

    const run = (pkg: Package) => {
        if (!enabled) return "disabled";

        const scripts = Object.keys(pkg.scripts);
        if (!scripts.length) return "not-found";

        const found = scripts.filter(isSelected);
        if (!found) {
            return "error: Script Not found: " + selection.join(", ");
        }

        for (const script of found) {
            const result = shell.exec(`npm run ${script}`);
            if (result.code !== 0) {
                throw new Error(`Package: ${pkg.name} Run script ${script} failed.`);
            }
        }
        return "completed";
    };
    return { name: "runScript", run };
};