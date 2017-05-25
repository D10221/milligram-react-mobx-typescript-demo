import * as shell from "shelljs";
import { root } from "./root";
import { current as ArgsQuery } from "./args";

import { getSelection } from "./package/selection";
import { Clean } from "./package/package-clean";
import { RunScripts } from "./package/run-scripts";
import { Build } from "./package/package-build";
import { Walker } from "./package/package-walker";
import { localPackages } from "./package/local-packages";
import { packageDir } from "./package/package-dir";

import { Task, taskContext } from "./task";
import { isNullOrUndefined } from "util";

const args = ArgsQuery.value;

console.log(`Packages: ${localPackages.map(x => x.name).join(", ")}`);
const selection = getSelection(args, localPackages);
console.log(`Package Selection: ${selection.map(x => x.name).join(", ")}`);

const tasks: Task[] = [
    Clean(taskContext("clean", args, selection)),
    RunScripts(taskContext("runScripts", args, selection)),
    Build(taskContext("build", args, selection)),
    // TODO: after/before:build runScripts(pkg);
    // savePackage(pkg); //not useful
    // install to root package
    // install(pkg); //not useful
];

shell.cd(root);
 const log: string[] = [];
const walker = Walker(localPackages,
    // ...
    (pkg) => {
        try {
            shell.cd(packageDir(pkg));           
            for (const task of tasks) {
                const result = task.run(pkg);
                log.push(`Package: ${pkg.name}, Task: ${task.name} -> ${result}`);
            }            
            return true;
        } catch (e) {
            console.log(e);
            return false;
        } finally {
            shell.cd(root);
        }
    },
    pkg => !isNullOrUndefined(selection.find(x => x.name === pkg.name)));

const result = walker.walk();
console.log(log.join("\n"));
console.log(result.completed.map(x => `completed: ${x.name}`).join("\n"));
process.exit(result.ok ? 1 : -1);