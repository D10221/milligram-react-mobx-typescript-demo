import * as  fs from "fs";
import * as path from "path";
import * as shell from "shelljs";
import { BuildConfig, Package } from "./interfaces";
import { getPackage } from "./package";
import { root } from "./root";
import { Query } from "./args";
import { getCurrentLogger } from "./logger";

const args = Query();
const logger = getCurrentLogger(null, null, ["file"]);
const logLevel = args.getFlagAsString("loglevel", "info");

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
            path.join(root, args.getFlagAsString("config", "build.config.json")),
            "utf-8"
        )
    )
);

const packageNames = config.packages.map(x => x.name);

const toBeClean = () => {
    const getList = () => {
        const _list = args.GetFlagAsList("clean");
        return !args.hasFlag("clean") ? [] : _list.length > 0 ? _list : packageNames;
    };

    let list: string[];
    return () => {
        return list || (list = getList());
    };
};

/**
 * look for package names in args...
 */
const selection = process.argv.filter(arg => {
    return packageNames.indexOf(arg) !== -1;
});

// begin
shell.cd(root);
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

        if (toBeClean()().find(x => x === pkg.name)) {
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
    if (args.hasFlag("link")) {
        console.log(`linking up ${link.name} ...`);
        log(shell.exec(`npm link ${link.name}`));
    }
    if (args.hasFlag("saveLink")) {
        console.log(`savelink: ${link.name} ...`);
        save(link);
    }
    if (args.hasFlag("installLink")) {
        console.log(`install link: ${link.name} ...`);
        install(link);
    }
}

console.log("done");
process.exit();