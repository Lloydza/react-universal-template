const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  name: 'server',
  target: 'node',
  devtool: 'eval-source-map',
  entry: [
    'babel-polyfill',
    path.join(__dirname, '../src/server/render/index.js')
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
    alias: {
      app: path.resolve(__dirname, '../src/app/'),
      server: path.resolve(__dirname, '../src/server/'),
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
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: "[name]--[local]--[hash:base64:5]"
            }
          }],
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        ON_SERVER: true,
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
};
