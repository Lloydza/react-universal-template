const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  performance: { hints: false },
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, '../src/app/index.js')
  ],
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    publicPath: '/',
    filename: 'bundle.[chunkhash].js',
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
              minimize: true,
              modules: true,
              localIdentName: "[local]___[hash:base64:5]"
            }
          }],
      }
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/server/index.html')
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
  ],
  optimization: {
    minimize: true,
    splitChunks: {
        // include all types of chunks
        chunks: "all"
    }
}
};
