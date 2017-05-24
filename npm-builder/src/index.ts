import * as shell from "shelljs";
import { root } from "./root";
import { current as ArgsQuery } from "./args";
import { getConfig } from "./config/get-config";

import { getSelection } from "./package/selection";

import { clean as _clean } from "./package/clean";
import { runScripts } from "./package/run-scripts";
import { build } from "./package/build";
import { install as _install } from "./package/install";
import { savePackage as _savePackage } from "./package/save-package";

const args = ArgsQuery.value;
const config = getConfig(args, root);
const selection = getSelection(args, config, root);
const clean = _clean(args, config);
const savePackage = _savePackage(args);
const install = _install(args, root);
// begin
shell.cd(root);

for (const pkg of selection) {
    try {
        console.log(`Package: ${pkg.name}`);
        shell.cd(pkg.dir);
        clean(pkg);
        runScripts(pkg); // before: build scripts
        build(pkg);
        // TODO: after:build runScripts(pkg);
        savePackage(pkg);
        // install to root package
        install(pkg);
    } catch (e) {
        console.log(e);
        process.exit(-1);
    } finally {
        shell.cd(root);
    }
}


console.log("done");
process.exit();