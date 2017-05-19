const path = require('path');
const cwd = path.resolve(__dirname, "../");
const sourceDir = path.resolve(__dirname, "../client/src");
const outDir = path.resolve(__dirname, "../", 'built');
const context = sourceDir;
const manifest = path.resolve(outDir, "vendor-manifest.json");
const main = [path.resolve(sourceDir, 'main.ts')];
const index = [path.resolve(sourceDir, 'index.tsx')];
const vendor = [path.resolve(sourceDir, "vendor.js")];
const tsConfig = "./client/tsconfig.json";
const htmlWebpackPluginTemplate = path.resolve(sourceDir, "index.html");
const resources = path.resolve(cwd, 'resources/**/*');
module.exports = {
    cwd,
    sourceDir,
    outDir,
    context,
    manifest,
    index,
    main,
    vendor,
    tsConfig,
    htmlWebpackPluginTemplate,
    resources
};