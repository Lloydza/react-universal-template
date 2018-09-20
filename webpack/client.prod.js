const path = require('path');
const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');

module.exports = {
  name: 'client',
  target: 'web',
  devtool: false,
  mode: "production",
  entry: {
    main: path.resolve(__dirname, '../src/app/index.jsx'),
    vendor: ['react', 'react-redux', 'react-router', 'redux', 'history', 'redux-thunk']
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js',
    path: path.resolve(__dirname, '../dist/static'),
    publicPath: '/',
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
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          ExtractCssChunks.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new StatsPlugin('../stats.json'),
    new ExtractCssChunks({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css",
    }),
    new OptimizeCssAssetsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        ENVIRONMENT_LEVEL: process.env.ENVIRONMENT_LEVEL || 1
      }
    }),
    new webpack.HashedModuleIdsPlugin()
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  }
}