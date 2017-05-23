import * as  fs from "fs";
import * as path from "path";
import * as shell from "shelljs";
import { root } from "./root";
import { current as ArgsQuery } from "./args";
import {getSelection} from "./package/selection";
import { clean as _clean} from "./package/clean";
import { getConfig} from "./config/get-config";

const args = ArgsQuery.value;
const config = getConfig(args, root);
const selection = getSelection(args, config);
const clean = _clean(args, config);
// begin
shell.cd(root);

for (const pkg of selection) {
    try {

        //
        console.log(`Package: ${pkg.name}`);

        const pkgDir = path.isAbsolute(pkg.dir) ? pkg.dir : path.resolve(root, pkg.dir);
        if (!fs.existsSync(pkgDir)) {
            throw new Error(`Package dir: ${pkg.dir} doens't exists, cwd: ${pkgDir}`);
        }
        shell.cd(pkgDir);

        clean(pkg);

        for (const script of pkg.scripts) {
            const result = shell.exec(script);
            if (result.code !== 0) {
                throw new Error("Build failed.");
            }
        }

        shell.exec(`npm run build`);

    } catch (e) {
        console.log(e);
        process.exit(-1);
    } finally {
        shell.cd(root);
    }
}

console.log("done");
process.exit();