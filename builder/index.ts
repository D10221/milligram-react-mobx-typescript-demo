import * as  fs from "fs";
import * as path from "path";
import * as shell from "shelljs";
import { BuildConfig } from "./interfaces";

const getFlag = (x: string, defaultValue?: string) => {
    const i = process.argv.indexOf(x);
    if (i === -1) { return null; }
    const value = process.argv[i + 1];
    return !value || value.trim() === "" ? defaultValue : value;
};

const log = (result: shell.ExecOutputReturnValue) => {
    if (result.stderr) {
        console.error(result.stderr);
    }
    if (result.stdout) {
        console.log(result.stdout);
    }
};

const clean = (input: string) => {
    return input.replace(/\/\/.*/, "");
    // .split(/\r?\n/)
    // .filter(line=> //.test(line)).join();
};

const root = path.resolve(process.cwd(), getFlag("--root") || process.cwd());
console.log(`root: ${root}`);

const config: BuildConfig = JSON.parse(
    clean(
        fs.readFileSync(path.join(root, getFlag("--config") || "build.config.json"), "utf-8")
    )
);

/**
 * as name,name,name,name
 */
const cleans = (getFlag("--clean", "*") || "").split(",");

shell.cd(root);

const packages = config.packages.map(x => x.name);
const selection = process.argv.filter(arg => {
    return packages.indexOf(arg) !== -1;
});

for (const pkg of config.packages) {
    try {

        if (selection.length > 0) {
            if (selection.indexOf(pkg.name) === -1) {
                continue;
            }
        }

        console.log(`Package: ${pkg.name}`);

        const pkgDir = path.isAbsolute(pkg.dir) ? pkg.dir : path.resolve(root, pkg.dir);
        if (!fs.existsSync(pkgDir)) {
            throw new Error(`Package dir: ${pkg.dir} doens't exists, cwd: ${pkgDir}`);
        }
        shell.cd(pkgDir);

        if (cleans[0] === "*" || cleans.find(x => x === pkg.name)) {
            console.log("clean: " + pkg.name);
            log(shell.exec("npm run clean"));
        }

        for (const script of pkg.scripts) {
            log(shell.exec(script));
        }
    } catch (e) {
        console.log(e);
        process.exit(-1);
    } finally {
        shell.cd(root);
    }
}

const linked = config.packages.filter(x => x.linked === true);
for (const link of linked) {
    console.log("link up..");
    log(shell.exec(`npm link ${link.name}`));
}

console.log("done");
process.exit();