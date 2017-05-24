import * as shell from "shelljs";
import { root } from "./root";
import { current as ArgsQuery } from "./args";

import { getSelection } from "./package/selection";

import { clean as _clean } from "./package/clean";
import { runScripts } from "./package/run-scripts";
import { build } from "./package/build";

// import { install as _install } from "./package/install";
// import { savePackage as _savePackage } from "./package/save-package";

const args = ArgsQuery.value;
const selection = getSelection(args,  root);
const clean = _clean(args);
// const savePackage = _savePackage(args);
// const install = _install(args, root);
// begin
shell.cd(root);

for (const pkg of selection) {
    try {
        console.log(`Package: ${pkg.name}`);
        shell.cd(pkg.dir);

        if (!args.hasFlag("clean")) {
            clean(pkg);
        }
        if (!args.hasFlag("runScripts")) {
            runScripts(pkg); // before: build scripts
        }
        if (!args.hasFlag("build")) {
            build(pkg);
        }

        // TODO: after:build runScripts(pkg);
        
        // savePackage(pkg); //not useful 
        
        // install to root package        
        // install(pkg); //not useful 
    } catch (e) {
        console.log(e);
        process.exit(-1);
    } finally {
        shell.cd(root);
    }
}


console.log("done");
process.exit();