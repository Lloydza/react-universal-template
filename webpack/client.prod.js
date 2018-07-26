const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'production',
  name: 'client',
  target: 'web',
  performance: { hints: false },
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, '../src/app/index.js')
  ],
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
    alias: {
      app: path.resolve(__dirname, '../src/app/'),
      public: path.resolve(__dirname, '../public/')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true,
                modules: true,
                localIdentName: '[name]--[local]--[hash:base64:5]'
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true
    }),
    new OptimizeCssAssetsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        ON_SERVER: false,
        NODE_ENV: JSON.stringify('production')
      }
    }),
  ],
  optimization: {
    minimize: true
  }
};
