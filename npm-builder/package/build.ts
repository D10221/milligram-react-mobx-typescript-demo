import * as shell from "shelljs";
import { Package } from "./Package";

export const build = (pkg: Package) => {
    if (shell.exec(`npm run build`).code !== 0) {
        throw new Error(`package ${pkg.name} build failed`);
    }
};