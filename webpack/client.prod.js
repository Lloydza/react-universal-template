const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');

module.exports = {
  name: 'client',
  target: 'web',
  devtool: false,
  mode: 'production',
  resolve: {
    extensions: ['*', '.js', '.ts', '.tsx', '.json'],
    alias: {
      app: path.resolve(__dirname, '../src/app/'),
      server: path.resolve(__dirname, '../src/server/'),
      utils: path.resolve(__dirname, '../src/utils/'),
    },
  },
  entry: {
    main: path.resolve(__dirname, '../src/app/index.prod.tsx'),
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
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        include: [path.resolve(__dirname, '../src/')],
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new WriteFilePlugin(),
    new StatsWriterPlugin({
      filename: '../stats.json',
    }),
    new OptimizeCssAssetsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.[chunkhash].css',
    }),
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
      },
    },
  },
};
