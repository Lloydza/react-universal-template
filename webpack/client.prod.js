const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');

module.exports = {
  name: 'client',
  target: 'web',
  devtool: false,
  mode: 'production',
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
    alias: {
      app: path.resolve(__dirname, '../src/app/'),
      server: path.resolve(__dirname, '../src/server/'),
    },
  },
  entry: {
    main: path.resolve(__dirname, '../src/app/index.prod.jsx'),
    vendor: ['react', 'react-redux', 'react-router', 'redux', 'history', 'redux-thunk'],
  },
  output: {
    filename: 'bundle.[chunkhash].js',
    chunkFilename: 'vendor.[chunkhash].js',
    path: path.resolve(__dirname, '../dist/static'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          ExtractCssChunks.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, '../src/')],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new WriteFilePlugin(),
    new StatsWriterPlugin({
      filename: '../stats.json',
    }),
    new ExtractCssChunks({
      filename: 'styles.[chunkhash].css',
    }),
    new OptimizeCssAssetsPlugin(),
    new webpack.HashedModuleIdsPlugin(),
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};
