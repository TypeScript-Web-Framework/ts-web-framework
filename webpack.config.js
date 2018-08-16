const path = require('path');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const glob = require('glob');

module.exports = (env, argv)  => {
    var mode = argv.mode || "development";
    webpackConfig = {
        devtool: false,
        mode: mode,
        node: {
            __dirname: false,
            __filename: false,
            fs: false,
            path: false,
            child_process: false,
            fullPath: false
        },
        target: "node",
        entry: glob.sync(__dirname + path.sep + 'src/index.ts'),
        externals: [nodeExternals()],
        module : {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: [
                        /node_modules/,
                        /tests/,
                        /\.(spect|test)\.ts/
                    ]
                }
            ]
        },
        resolve: {
            extensions: [ '.tsx', '.ts', '.js' ]
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
            libraryTarget: 'umd',
            library: 'TWF',
            umdNamedDefine: true
        },
        plugins: [
            new CleanWebpackPlugin(["./dist"], {
                verbose: false
            }),
            new CopyWebpackPlugin([
                {context: "./src/", from: '**/*.json', to: './'},
                {context: "./src/static", from: '**/*', to: './static', ignore: ["*.ts"]},
                {context: "./src/teampltes", from: '**/*', to: './teampltes', ignore: ["*.ts"]},
                {context: "./src/schemas", from: '**/*', to: './schemas', ignore: ["*.ts"]},
                {context: "./src/keys", from: '**/*', to: './keys', ignore: ["*.ts"]},
                {context: "./", from: 'LICENSE', to: './'}
            ], {
                ignore: [
                    {
                        dot: true,
                        glob: 'node_modules/**/*'
                    },
                    {
                        dot: true,
                        glob: 'bin/**/*'
                    }
                ]
            })
        ]
    };
    if (mode === "none") {
        webpackConfig.entry = glob.sync(__dirname + path.sep + 'src/tests/**/*.spect.ts');
    }
    else if (mode === "production") {
        webpackConfig.entry = __dirname + path.sep + 'src/index.ts';
        webpackConfig.optimization = {
            minimize: true,
            minimizer: [new UglifyJsPlugin({
                extractComments: true,
                parallel: true,
                sourceMap: false,
                include: /\.js$/,
                uglifyOptions: {
                    comments: false,
                    warnings: false,
                    compress: {
                        global_defs: {"@alert": "console.log",},
                        drop_console: true
                    },
                    mangle: true,
                    toplevel: false,
                    ie8: false,
                    safari10: false,
                    keep_fnames: false,
                    keep_classnames: false
                }
            })]
        };
    }
    return webpackConfig;
};
