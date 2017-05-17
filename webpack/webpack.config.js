const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");

// flags: debug/production
const {
    isDevBuild
} = require("./webpack.env");
if (!isDevBuild) {
    throw new Error("Not Implemented: production build");
}

// locations
const locations = require("./webpack.locations");

// ts-loader: config:
const tsLoaderOptions = isDevBuild ? {
    // dev
    configFileName: "./tsconfig.json"
} : {
        // prod     
        configFileName: "./tsconfig.prod.json"
    };
console.log("ts-loader-options", JSON.stringify(tsLoaderOptions, null, 2));

// Will Trhow if Not exists
try {
    fs.statSync(tsLoaderOptions.configFileName);
} catch (e) {
    console.error("tsconfig.json: 'Not Found?'");
    console.error(e.message);
    process.exit(-1);
}
const outputFilenameTemplate = '[name].bundle.js';

module.exports = (env) => {
    return [{
        stats: {
            modules: false
        },
        // devtool: '#source-map',
        entry: {
            index: locations.index,
        },
        resolve: {
            modules: ['node_modules'],
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        output: {
            path: locations.outDir,
            filename: outputFilenameTemplate
        },
        module: {
            rules: [
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                    loader: 'url-loader?limit=100000'
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader', 'css-loader'
                    ],
                    exclude: [/node_modules/]
                },
                {
                    test: /\.tsx?$/,
                    exclude: [/node_modules/],
                    use: [{
                        loader: 'ts-loader',
                        options: tsLoaderOptions
                    }]
                },
                {
                    test: /\.js$/,
                    exclude: [/node_modules/],
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }],
                },
                {
                    test: /\.txt$/,
                    use: 'raw-loader'
                }
            ]
        },
        plugins: [
            // ...
            // new webpack.optimize.CommonsChunkPlugin('vendor'),
            //Typically you'd have plenty of other plugins here as well
            new webpack.DllReferencePlugin({
                context: locations.sourceDir,
                manifest: locations.manifest
            }),
            new HtmlWebpackPlugin(
                {
                    template: "./src/index.html",
                    inject: "body"
                }
            ),
        ]
            .concat(isDevBuild ? [
                // Plugins that apply in development builds only          
                new webpack.SourceMapDevToolPlugin({
                    filename: '[file].map', // Remove this line if you prefer inline source maps
                    moduleFilenameTemplate: path.relative(
                        locations.outDir,
                        '[resourcePath]'), // Point sourcemap entries to the original file locations on disk
                    // columns: false, // false: is faster (500ms), When false column mappings in SourceMaps are ignored and a faster SourceMap implementation is used
                    // module: false, // true: is faster, When false loaders do not generate SourceMaps and the transformed code is used as source instead
                }),
            ] : [
                    // Plugins that apply in production builds only,
                    new webpack.DefinePlugin({
                        'process.env.NODE_ENV': JSON.stringify('production')
                    }),
                    new webpack.optimize.UglifyJsPlugin({
                        beautify: false,
                        mangle: {
                            screw_ie8: true,
                            keep_fnames: true
                        },
                        compress: {
                            screw_ie8: true
                        },
                        comments: false
                    }),
                    // ... 
                    new ExtractTextPlugin('site.css')
                ]),
    }]
};