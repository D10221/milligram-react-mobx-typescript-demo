import * as shell from "shelljs";
import { Package } from "./Package";
import { ArgsQuery } from "../args/query";

export const install = (args: ArgsQuery, root: string) => {
    const save = args.hasFlag("installSave");
    const ok = save || args.hasFlag("install");
    const list: string[] = args.GetFlagAsList("install", []);

    const canInstall = (pkg: Package): boolean => {

        return ok && list.indexOf(pkg.name) !== -1;
    };

    const _install = (pkg: Package) => {
        if (canInstall(pkg)) {
            console.log(`install: ${pkg.name} ...`);
            const result = shell.exec(`npm install ${pkg.dir} ${save ? "--save" : ""}`, {
                cwd: root
            }) as { code: number };
            if (result.code !== 0) {
                throw new Error("Can't install " + pkg.name);
            }
        }

    };
    return _install;
};
