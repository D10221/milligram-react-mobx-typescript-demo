import * as shell from "shelljs";
import { Package } from "./interfaces";
import { ArgsQuery } from "../args/query";

export const installLink = (args: ArgsQuery) => {
    const list: string[] = args.GetFlagAsList("installLink", []);

    const canInstall = (pkg: Package): boolean => {
        const ok = args.hasFlag("installLink");
        return ok && list.indexOf(pkg.name) !== -1;
    };

    return (pkg: Package, save?: boolean) => {
        if (canInstall(pkg)) {
            console.log(`install link: ${pkg.name} ...`);
            if (shell.exec(`npm install ${pkg.dir} ${save ? "--save" : ""}`).code !== 1) {
                throw new Error("Can't install " + pkg.name);
            }
        }

    };
};
