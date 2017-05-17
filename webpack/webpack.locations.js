const path = require('path');

const cwd = process.cwd();
const sourceDir = path.resolve(cwd, "src");
const outDir = path.resolve(process.cwd(), 'built');
const context = sourceDir;
const manifest = path.resolve(outDir, "vendor-manifest.json");
const main = [path.resolve(cwd, sourceDir, 'main.ts')];
const index = [path.resolve(cwd, sourceDir, 'index.tsx')];
const vendor = [path.join(__dirname, "vendor.js")];

module.exports = {
    cwd,
    sourceDir,
    outDir,
    context,
    manifest,
    index,
    main,
    vendor,
};