const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'eval-source-map',
  mode: 'development',
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
    alias: {
      app: path.resolve(__dirname, '../src/app/'),
      server: path.resolve(__dirname, '../src/server/'),
    },
  },
  entry: ['webpack-hot-middleware/client', path.resolve(__dirname, '../src/app/index.dev.jsx')],
  output: {
    filename: 'bundle.js',
    chunkFilename: 'vendor.js',
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
    new webpack.HotModuleReplacementPlugin(),
    new WriteFilePlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/server/index.html'),
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new webpack.DefinePlugin({
      ENVIRONMENT_LEVEL: process.env.ENVIRONMENT_LEVEL || null,
      IS_LOCAL: process.env.IS_LOCAL || false,
    }),
  ],
  optimization: {
    minimize: false,
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
