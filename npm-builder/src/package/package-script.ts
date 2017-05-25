import * as shell from "shelljs";
import { Package } from "./Package";
import { isNullOrUndefined as isNull } from "util";
import { TaskContext } from "../task";

/**
 * run all Scripts by name , maybe filtered
 */
export const Script = (config: TaskContext) => {
    const { enabled, args } = config;

    const selection = args.GetFlagAsList("script");

    const isSelected = (scriptName: string) => !isNull(
        selection.find(x => x === scriptName)
    );

    const run = (pkg: Package) => {
        if (!enabled) return "disabled";

        const scripts = Object.keys(pkg.scripts);

        if (!scripts.length) return "not-found";

        const script = scripts.filter(isSelected);
        if (!script) {
            return "error: Script Not found: " + selection.join(", ");
        }

        const result = shell.exec(`npm run ${script}`);
        if (result.code !== 0) {
            throw new Error(`Package: ${pkg.name} Run script ${script} failed.`);
        }
        return "completed";
    };
    return { name: "runScript", run };
};