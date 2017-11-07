const webpack = require('webpack');
const path = require('path');
const spreadOperator = require('babel-plugin-transform-object-rest-spread');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    externals: [nodeExternals()],
    
    entry: { server: path.join(__dirname, './src/server/index.js') },

    output: {
        path: path.join(__dirname, './build'),
        filename: '[name].js',
        publicPath: '/'
    },

    resolve: {
        alias: {
            '~': path.join(__dirname, './src/app')
        },
        extensions: ['.js', '.jsx']
    },

    target: 'node',

    node: {
      __dirname: true
    },

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
            use: [
                    {
                        loader: 'css-loader/locals',
                        options:
                        {
                            modules: true,
                            localIdentName: '[name]--[local]--[hash:base64:5]'
                        }
                    }
                ]
        }]
    },

    plugins: [
        new webpack.DefinePlugin({
            ONSERVER: true
        })
    ]
}
