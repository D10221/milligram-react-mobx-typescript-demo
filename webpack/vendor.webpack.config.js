var path = require("path");
var webpack = require("webpack");

// flags: debug/production
const {
    isDevBuild
} = require("./webpack.env");

// locations
const {
    cwd,    
    sourceDir,
    outDir,
    vendor,
} = require("./webpack.locations");

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