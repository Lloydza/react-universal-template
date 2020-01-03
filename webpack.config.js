const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const TerserPlugin = require('terser-webpack-plugin');

const environment = process.env.ENVIRONMENT_LEVEL || 'PROD';
const isLocal = process.env.IS_LOCAL || false;
const isProd = environment === 'PROD';

const entry = isProd
  ? [path.resolve(__dirname, './src/app/index.tsx')]
  : [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?noInfo=true',
      path.resolve(__dirname, './src/app/index.tsx'),
    ];

const plugins = [
  new WebpackBar(),
  new HtmlWebpackPlugin({
    filename: '../index.html',
    template: path.resolve(__dirname, './src/server/index.html'),
  }),
  new webpack.NoEmitOnErrorsPlugin(),
  new MiniCssExtractPlugin({
    filename: isProd ? 'styles.[chunkhash].css' : 'styles.css',
  }),
  new webpack.DefinePlugin({
    'process.env': {
      ENVIRONMENT_LEVEL: JSON.stringify(environment),
      IS_LOCAL: JSON.stringify(isLocal),
    },
  }),
];

if (isProd) {
  plugins.push(new webpack.HashedModuleIdsPlugin());
  plugins.push(new OptimizeCssAssetsPlugin());
  plugins.push(new webpack.optimize.AggressiveMergingPlugin());
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(new WriteFilePlugin());
  plugins.push(new ImageminPlugin({ disable: false, optipng: null }));
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
              hmr: !isProd,
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
              sourceMap: !isProd,
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
    minimize: isProd,
    minimizer: isProd
      ? [
          new TerserPlugin({
            test: /\.js(\?.*)?$/i,
            cache: true,
            parallel: true,
            terserOptions: {
              output: {
                comments: false,
              },
            },
          }),
        ]
      : [],
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
