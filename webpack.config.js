const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const environment = process.env.ENVIRONMENT_LEVEL || 'PROD';
const isLocal = process.env.IS_LOCAL || false;
const isProd = environment === 'PROD';

const entry = isProd
  ? [path.resolve(__dirname, './src/app/index.prod.tsx')]
  : [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?noInfo=true',
      path.resolve(__dirname, './src/app/index.dev.tsx'),
    ];

const plugins = [
  new WebpackBar(),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './src/server/index.html'),
  }),
  new webpack.NoEmitOnErrorsPlugin(),
  new MiniCssExtractPlugin({
    filename: isProd ? 'styles.[chunkhash].css' : 'styles.css',
  }),
  new webpack.DefinePlugin({
    ENVIRONMENT_LEVEL: environment,
    IS_LOCAL: isLocal,
  }),
];

if (isProd) {
  plugins.push(new webpack.HashedModuleIdsPlugin());
  plugins.push(new OptimizeCssAssetsPlugin());
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(new WriteFilePlugin());
}

module.exports = {
  name: 'client',
  target: 'web',
  devtool: isProd ? false : 'eval-source-map',
  mode: isProd ? 'production' : 'development',
  stats: false,
  resolve: {
    extensions: ['*', '.js', '.ts', '.tsx', '.json'],
    alias: {
      app: path.resolve(__dirname, './src/app/'),
      server: path.resolve(__dirname, './src/server/'),
      utils: path.resolve(__dirname, './src/utils/'),
    },
  },
  entry,
  output: {
    filename: isProd ? 'bundle.[chunkhash].js' : 'bundle.js',
    chunkFilename: isProd ? 'vendor.[chunkhash].js' : 'vendor.js',
    path: path.resolve(__dirname, './dist/static'),
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
            options: {
              hmr: isProd ? false : true,
            },
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
                path: path.resolve(__dirname, './.postcssrc'),
              },
              sourceMap: isProd ? false : true,
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        include: [path.resolve(__dirname, './src/')],
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
  plugins,
  optimization: {
    minimize: isProd ? true : false,
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
