
import { Package } from "./Package";
import { ArgsQuery } from "../args";
import { BuildConfig } from "../config/BuildConfig";
import * as path from "path";
import * as fs from "fs";

export const getSelection = (args: ArgsQuery, config: BuildConfig, root: string): Package[] => {

    const list = args.getParamAsList();
    const selection = !list.length ? config.packages
        : config.packages.filter(p => list.indexOf(p.name) !== -1);

    if (!selection.length) {
        throw new Error("Package Selection Empty");
    }

    for (const pkg of selection) {
        const pkgDir = path.isAbsolute(pkg.dir) ? pkg.dir : path.resolve(root, pkg.dir);
        if (!fs.existsSync(pkgDir)) {
            throw new Error(`Package dir: ${pkg.dir} doens't exists, cwd: ${pkgDir}`);
        }
    }
    return selection;
};
