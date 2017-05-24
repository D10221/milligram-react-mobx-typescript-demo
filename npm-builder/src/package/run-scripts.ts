import * as shell from "shelljs";
import { Package } from "./Package";

/**
 * Script NAMES
 */
export const runScripts = (pkg: Package) => {
    for (const script of Object.keys(pkg.scripts)) {
        // script name
        const result = shell.exec(`npm run ${script}`);
        if (result.code !== 0) {
            throw new Error("Build failed.");
        }
    }
};