var path = require("path");
var webpack = require("webpack");

const isDevBuild = !(process.env.NODE_ENV === "production" || process.argv.find(a => a === "-p"))
console.log(`isDevBuild: ${isDevBuild}`);

// locations
const sourceDir = path.resolve(__dirname, "./src");
const outDir = path.resolve(__dirname, '../built');
const context = sourceDir;
const manifest = path.resolve(outDir, "vendor-manifest.json");
// const main = [path.resolve(sourceDir, 'main.ts')];
const index = [path.resolve(sourceDir, 'index.tsx')];
const vendor = [path.resolve(sourceDir, "vendor.js")];
const tsConfig = "./tsconfig.json";
const htmlWebpackPluginTemplate = path.resolve(sourceDir, "index.html");
const resources = path.resolve(__dirname, 'resources/**/*');
const outputFilenameTemplate = '[name].bundle.js';
const fileNameTemplate = "[name].dll.js";
const dllPluginNameTemplate = "[name]";
const dllPluginMainifestPathTemplate = path.resolve(outDir, "[name]-manifest.json");

module.exports = (env) => {
    return [{
        entry: {
            vendor
        },
        output: {
            path: outDir,
            filename: fileNameTemplate,
            library: dllPluginNameTemplate
        },
        plugins: [
            new webpack.DllPlugin({
                path: dllPluginMainifestPathTemplate,
                name: dllPluginNameTemplate,
                context: sourceDir
            }),
            // new webpack.optimize.OccurenceOrderPlugin()
        ].concat(isDevBuild ? [
            // ...
        ] : [
                new webpack.optimize.UglifyJsPlugin()
            ]),
        resolve: {
            modules: [
                'node_modules'
            ],
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
    }]
};