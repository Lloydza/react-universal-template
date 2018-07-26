const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'eval',
  mode: "development",

  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
    'react-hot-loader/patch',
    path.resolve(__dirname, '../src/app/index.js')
  ],

  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../dist/static'),
    publicPath: '/static/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          ExtractCssChunks.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
        ],
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.css']
  },
  
  plugins: [
    new WriteFilePlugin(),
    new ExtractCssChunks(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        ENVIRONMENT_LEVEL: process.env.ENVIRONMENT_LEVEL || 1
      }
    })
  ],
  optimization: {
    splitChunks: {
      filename: '[name].js',
      minChunks: Infinity
    }
  }
}
