var webpack = require('webpack');
var path = require('path');

var SRC_DIR = path.resolve(__dirname, "src/main/web");
var DIST_DIR = path.resolve(__dirname, "src/main/resources/static");

module.exports = {
    entry: SRC_DIR +'/app.js',
    //cache: true,
    //debug: true,
    output: {
        path: DIST_DIR,
        filename: 'bundle.js',
        publicPath: "/"
    },
    devServer: {
        contentBase: SRC_DIR,
        publicPath: "/",
        compress: true,
        stats: "errors-only",   // Only show error messages
        open: true,             // Opens new browser window when running dev server for first time
        port: 8083
    },
    module: {
        rules: [
            {
                test: /\.js?/,
                include: [
                    SRC_DIR
                ],
                exclude: [
                    /node_modules/
                ],
                loader: "babel-loader",
                options: {
                    presets: [
                        ["react"],
                        //["es2015", { modules: false }],  // Enable tree-shaking
                        ["es2015"],  
                        ["stage-2"],
                        ["env"]
                    ]
                    //,plugins: ['transform-es2015-modules-commonjs']
                }
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(gif|jpg|png|svg)$/, 
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192
                        }
                    }
                ] 
            },            
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [
                        {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'font/',
                            publicPath: '/',
                            useRelativePath: true
                        }
                    }
                ]
            }            
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery',
            'Popper': 'popper.js',
            'Waves': 'node-waves'
        })    
    ]
};
