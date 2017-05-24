const shell = require("shelljs");
const pkgs = process.argv.slice(2).map(
    a => {
        return {
            name: a, type: "@types/" + a
        }
    }
)
shell.exec(
  `npm uninstall --save-dev ${pkgs.map(a=> a.type).join(' ')} && npm install --save ${pkgs.map(x=>x.name).join(" ")}`
);