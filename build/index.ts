import * as  fs from "fs";
import * as path from "path";
import * as shell from "shelljs";

const root = [process.argv.indexOf("--root")]
    .filter(i => i > 1)
    .map(i => process.argv[i + 1])
    .filter(x => x)
    .map(p => path.isAbsolute(p) ? p : path.resolve(process.cwd(), p))
[0] || process.cwd();

const getFlag = (x: string, defaultValue?: string) => {
    const i = process.argv.indexOf(x);
    if (i === -1) { return null; }
    const value = process.argv[i + 1];
    return !value || value.trim() === "" ? defaultValue : value;
};

const projects = [
    {
        name: "milligrami",
        dir: "packages/milligrami",
        scripts: ["npm run build"]
    },
    {
        name: "client",
        dir: "packages/client",
        scripts: [
            "npm link ../milligrami",
            "npm run build"
        ]
    },
    {
        name: "main",
        dir: "packages/main",
        scripts: [
            "npm run build"
        ]
    }
];

/**
 * as name,name,name,name
 */
const cleans = (getFlag("--clean", "*") || "").split(",");

shell.cd(root);
for (const project of projects) {
    try {

        if (!fs.existsSync(project.dir)) {
            throw new Error("Project dir: " + project.dir + "doens't exists");
        }

        shell.cd(project.dir);

        const clean = cleans[0] === "*" || cleans.find(x => x === project.name);
        if (clean) {
            console.log("clean: " + project.name);
            shell.exec("npm run clean");
        }

        for (const script of project.scripts) {
            shell.exec(script);
        }
    } catch (e) {
        console.log(e);
        process.exit(-1);
    } finally {
        shell.cd(root);
    }
}

console.log("done");
process.exit();