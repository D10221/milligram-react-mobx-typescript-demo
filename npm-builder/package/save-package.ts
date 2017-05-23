import * as fs from "fs";
import { Package } from "./Package";
import { current as rootPackage } from "./root-package";
import { ArgsQuery } from "../args/query";

export const savePackage = (args: ArgsQuery) => {
    const save = args.hasFlag("save");
    const packageJson = rootPackage.value;
    return (pkg: Package) => {
        if (!save) {
            return;
        }
        packageJson.package.dependencies[pkg.name] = `file:${pkg.dir}`;
        fs.writeFileSync(packageJson.path, JSON.stringify(packageJson, null, 2));
    };
};