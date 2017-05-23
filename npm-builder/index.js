const fs = require("fs");
const shell = require("shelljs");
const path = require("path");
const build = path.resolve(__dirname, "built");
console.log(build);

if (!fs.existsSync(build)) {
    const result = shell.exec(`tsc -p ${__dirname}`, {
        async: false,
        cwd: __dirname
    });
    if (result.code !== 0) {
        console.log(result.stderr || result.stdout);
        process.exit(-1);
    }
    console.log(result.stdout);
}

require("./built/index");