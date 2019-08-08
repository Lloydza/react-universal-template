const webpack = require('webpack');
const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  name: 'server',
  target: 'node',
  devtool: false,
  mode: 'production',
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
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
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              exportOnlyLocals: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, '../src/')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: 'commonjs',
                },
              ],
              '@babel/preset-react',
            ],
          },
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
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
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
