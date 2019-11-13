const webpack = require('webpack');
const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  name: 'server',
  target: 'node',
  devtool: false,
  mode: 'production',
  resolve: {
    extensions: ['*', '.js', '.ts', '.tsx', '.json'],
    alias: {
      app: path.resolve(__dirname, '../src/app/'),
      server: path.resolve(__dirname, '../src/server/'),
    },
  },
  entry: path.resolve(__dirname, '../src/server/server.prod.js'),
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: [path.resolve(__dirname, '../src/')],
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
  plugins: [
    new WriteFilePlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  optimization: {
    minimize: true,
  },
};
