import * as fs from "fs";
import { Package } from "./interfaces";
import { current as rootPackage } from "./root-package";

export const savePackage = () => {
    const packageJson = rootPackage.value;
    return (pkg: Package) => {
        packageJson.package.dependencies[pkg.name] = `file:${pkg.dir}`;
        fs.writeFileSync(packageJson.path, JSON.stringify(packageJson, null, 2));
    };
};