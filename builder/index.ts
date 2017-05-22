import * as  fs from "fs";
import * as path from "path";
import * as shell from "shelljs";
import { BuildConfig, Package } from "./interfaces";
import { getPackage } from "./package";
import { root } from "./root";
import { getFlag, hasFlag } from "./flags";
import { getCurrentLogger } from "./logger";

const logger = getCurrentLogger(null, null, ["file"]);
const logLevel = getFlag("--loglevel") || "info";

const log = (result: shell.ExecOutputReturnValue) => {
    if (result.stderr) {
        logger(logLevel, result.stderr);
    }
    if (result.stdout) {
        logger(logLevel, result.stdout);
    }
    return result;
};

const cleanComments = (input: string) => {
    return input.replace(/\/\/\s+?.*/mg, "");
};

const savePackage = (root: string) => {
    return (pkg: Package) => {
        const packageJson = getPackage(root);
        packageJson.package.dependencies[pkg.name] = `file:${pkg.dir}`;
        fs.writeFileSync(packageJson.path, JSON.stringify(packageJson, null, 2));
    };
};

const installLink = (root: string) => (pkg: Package, save?: boolean) => {
    return shell.exec(`npm install ${pkg.dir} ${save ? "--save" : ""}`, {
        cwd: root,
    });
};

const config: BuildConfig = JSON.parse(
    cleanComments(
        fs.readFileSync(
            path.join(root, getFlag("--config") || "build.config.json"),
            "utf-8"
        )
    )
);

/**
 * as name,name,name,name
 */
const cleans = (getFlag("--clean", "*") || "").split(",");

shell.cd(root);

const packageNames = config.packages.map(x => x.name);

/**
 * look for package names in args...
 */
const selection = process.argv.filter(arg => {
    return packageNames.indexOf(arg) !== -1;
});

for (const pkg of config.packages) {
    try {

        // filter out non selected
        if (selection.length > 0) {
            if (selection.indexOf(pkg.name) === -1) {
                continue;
            }
        }

        //
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
            const result = log(shell.exec(script));
            if (result.code !== 0) {
                throw new Error("Build failed.");
            }
        }

    } catch (e) {
        console.log(e);
        process.exit(-1);
    } finally {
        shell.cd(root);
    }
}

const linked = config.packages.filter(x => x.linked === true);
const save = savePackage(root);
const install = installLink(root);
for (const link of linked) {
    if (hasFlag("--link")) {
        console.log(`linking up ${link.name} ...`);
        log(shell.exec(`npm link ${link.name}`));
    }
    if (hasFlag("--save-link")) {
        console.log(`savelink: ${link.name} ...`);
        save(link);
    }
    if (hasFlag("--install-link")) {
        console.log(`install link: ${link.name} ...`);
        install(link);
    }
}

console.log("done");
process.exit();