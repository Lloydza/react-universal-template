const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  name: 'client',
  target: 'web',
  devtool: false,
  mode: 'production',
  stats: false,
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
        test: /\.(css)$/,
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
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname, '../.postcssrc'),
              },
              sourceMap: true,
            },
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
    new WebpackBar(),
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/server/index.html'),
    }),
    new OptimizeCssAssetsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.[chunkhash].css',
    }),
    new webpack.DefinePlugin({
      ENVIRONMENT_LEVEL: process.env.ENVIRONMENT_LEVEL || null,
      IS_LOCAL: process.env.IS_LOCAL || false,
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
