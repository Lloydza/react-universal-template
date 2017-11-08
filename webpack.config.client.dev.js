const webpack = require('webpack');
const path = require('path');
const spreadOperator = require('babel-plugin-transform-object-rest-spread');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
   
    entry: {
        app: path.join(__dirname, './src/app/index.js'),
        vendor: ["react", "react-dom", "react-router", "react-router-dom", "redux", "redux-thunk", "react-redux", "history", "babel-polyfill", "isomorphic-fetch"]
    },

    output: {
        path: path.join(__dirname, './build'),
        filename: 'bundle.js',
        publicPath: '/'
    },

    devtool: '#inline-source-map',

    resolve: {
        alias: {
            '~': path.join(__dirname, './src/app')
        },
        extensions: ['.js', '.jsx']
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
            debug: true
        }),
        new webpack.DefinePlugin({
            ONSERVER: false,
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new ExtractTextPlugin({
            filename: 'styles.css',
            allChunks: true
        })
    ]
}
