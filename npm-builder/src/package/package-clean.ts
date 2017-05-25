import * as shell from "shelljs";
import { Package } from "./Package";
import { TaxContext } from "./Task";

export const Clean = (context: TaxContext) => {
    const { enabled, isSelectedForPackage } = context;
    const run = (pkg: Package) => {
        if (!enabled) return "disabled";
        if (!isSelectedForPackage(pkg)) return "unselected";
        if (shell.exec("npm run clean").code !== 0) {
            throw new Error("Can't clean " + pkg.name);
        }
        return "completed";
    };

    return {
        name: "clean",
        run
    };
};