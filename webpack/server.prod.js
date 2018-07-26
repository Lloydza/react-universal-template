const webpack = require('webpack');
const path = require('path');

const res = p => path.resolve(__dirname, p);
const entry = res('../src/server/render/index.js');
const output = res('../buildServer');

module.exports = {
  name: 'server',
  target: 'node',
  devtool: 'eval',
  mode: "production",

  entry: [entry],

  output: {
    path: output,
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },

  node: {
    __dirname: true
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
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: true,
              minimize: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.css']
  },
  
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        ENVIRONMENT_LEVEL: process.env.ENVIRONMENT_LEVEL || 1
      }
    })
  ]
}
