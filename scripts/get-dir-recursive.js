const fs = require("fs");
const path = require("path");

/**
 * @param o {{ pattern: {regex}, root: {string}, isDir: {boolean}}}
 */
module.exports = (o) => {
    const { pattern, root, isDir } = o

    const checkType = (_path) => {
        return isDir && fs.lstatSync(_path).isDirectory();
    };

    const result = [];
    const dirx = (_path, regex) => {
        for (let file of fs.readdirSync(_path)) {
            let _f = path.join(_path, file)
            if (checkType(_f)) {
                if (regex.test(file)) {
                    result.push(_f);
                }
                dirx(_f, regex);
            }
        }
    };
    dirx(root, pattern);
    return result;
}