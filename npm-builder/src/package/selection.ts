
import * as path from "path";
import * as fs from "fs";
import { Package } from "./Package";
import { ArgsQuery } from "../args";
import { localPackages } from "./local-packages";
import { packageDir } from "./package-dir";

export const getSelection = (args: ArgsQuery,  root: string): Package[] => {

    const list = args.getParamAsList();
    const selection = !list.length ? localPackages
        : localPackages.filter(p => list.indexOf(p.name as string) !== -1);

    if (!selection.length) {
        throw new Error("Package Selection Empty");
    }


    for (const pkg of selection) {
        const dir = packageDir(pkg);
        const pkgDir = path.isAbsolute(dir) ? dir : path.resolve(root, dir);
        if (!fs.existsSync(pkgDir)) {
            throw new Error(`Package dir: ${pkg.dir} doens't exists, cwd: ${pkgDir}`);
        }
    }
    return selection;
};
