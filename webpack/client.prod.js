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
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'bundle.[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
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
        use: [ 'style-loader', 'css-loader' ]
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   use: ['url-loader?limit=10000&mimetype=application/font-woff'] },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,   use: ['url-loader?limit=10000&mimetype=application/font-woff'] },
      { test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,   use: ['url-loader?limit=10000&mimetype=font/opentype'] },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    use: ['url-loader?limit=10000&mimetype=application/octet-stream'] },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    use: ['file-loader'] },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    use: ['url-loader?limit=10000&mimetype=image/svg+xml'] }
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
