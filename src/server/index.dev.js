const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

const clientConfig = require('../../webpack/client.dev');
const serverConfig = require('../../webpack/server.dev');

const logger = require('./middleware/logger');
const cors = require('./middleware/cors');

const app = express();
app.use(logger);
app.use(cors);

const compiler = webpack([clientConfig, serverConfig]);
const clientCompiler = compiler.compilers[0];
const options = {
  serverSideRender: true,
};

app.use(webpackDevMiddleware(compiler, options));
app.use(webpackHotMiddleware(clientCompiler));

app.use(express.static(clientConfig.output.publicPath));
app.use(express.static('public'));

app.use(webpackHotServerMiddleware(compiler));

const port = process.env.PORT || 3000;
let isBuilt = false;
compiler.plugin('done', () => {
  if (!isBuilt) {
    app.listen(port, () => {
      isBuilt = true;
      console.log(`Web Server listening on port: ${port}`);
    });
  }
});
