const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    path.resolve(__dirname, '../src/app/index.js')
  ],
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    publicPath: '/',
    filename: 'bundle.js',
    chunkFilename: '[name].[chunkhash].js',
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
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: "[local]___[hash:base64:5]"
            }
          }],
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WriteFilePlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/server/index.html')
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
};
