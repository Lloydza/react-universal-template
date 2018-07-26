const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  performance: { hints: false },
  target: 'node',
  entry: [
    'babel-polyfill',
    path.join(__dirname, '../src/server/index.js')
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'server.js',
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
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: true,
              minimize: true,
              localIdentName: "[name]--[local]--[hash:base64:5]"
            }
          }],
      }
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        ON_SERVER: true,
        NODE_ENV: JSON.stringify('production')
      }
    }),
  ],
  optimization: {
    minimize: true
  }
};
