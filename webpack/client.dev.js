const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

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
        test: /\.css$/,
        include: /node_modules/,
        use: [ExtractCssChunks.loader, 'css-loader'],
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
    new webpack.HotModuleReplacementPlugin(),
    new WriteFilePlugin(),
    new ExtractCssChunks({
      filename: 'styles.css',
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
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
