const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const spreadOperator = require('babel-plugin-transform-object-rest-spread');

module.exports = {
   
    entry: {
        app: path.join(__dirname, './src/app/index.js'),
        vendor: ["preact", "preact-compat", "react", "react-dom", "react-router", "react-router-dom", "redux", "redux-thunk", "react-redux", "history", "babel-polyfill", "isomorphic-fetch"]
    },

    output: {
        path: path.join(__dirname, './build'),
        filename: 'bundle.js',
        publicPath: '/'
    },

    devtool: false,

    resolve: {
        alias: {
            'react': 'preact-compat',
            'react-dom': 'preact-compat'
        }
    },

    target: 'web',

    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: ['env','react'],
                plugins: [spreadOperator]
            }
        }, {
            test: /\.(css|scss|sass)$/,
            loader: ExtractTextPlugin.extract(
                {
                  loader: 'css-loader',
                  query: {
                    modules: true,
                    localIdentName: '[name]--[local]--[hash:base64:5]'
                  }
                }
            )
        }]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
        new webpack.LoaderOptionsPlugin({
            debug: false
        }),
        new webpack.DefinePlugin({
            ONSERVER: false,
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
         new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                unused: true,
                dead_code: true,
                drop_debugger: true,
                drop_console: true
            },
            output: {
                comments: false
            },
            sourceMap:  false
        }),
        new ExtractTextPlugin({
            filename: 'styles.css',
            allChunks: true
        }),
        new OptimizeCssAssetsPlugin()
    ]
}
