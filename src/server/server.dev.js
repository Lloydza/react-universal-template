require('./globals');
require('isomorphic-fetch');
const Koa = require('koa');
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const webpack = require('webpack');
const webpackDevMiddleware = require('koa-webpack-dev-middleware');
const webpackHotMiddleware = require('koa-webpack-hot-middleware');
const webpackHotServerMiddleware = require('koa-webpack-hot-server');
const cookieParser = require('koa-cookie');
const logger = require('./middleware/logger');
const redirectSubdomains = require('./middleware/redirectSubdomains');
const tokenManager = require('./middleware/tokenManager');
const health = require('./middleware/health');

const clientConfig = require('../../webpack/client.dev');
const serverConfig = require('../../webpack/server.dev');

const compiler = webpack([clientConfig, serverConfig]);
const clientCompiler = compiler.compilers[0];
const options = {
  serverSideRender: true,
  hot: true,
};

const createServer = () => {
  const koaServer = new Koa();
  koaServer.use(
    helmet({
      hsts: false,
    }),
  );
  koaServer.use(logger);
  koaServer.use(bodyParser());
  koaServer.use(serve('static'));
  koaServer.use(redirectSubdomains);
  koaServer.use(webpackDevMiddleware(compiler, options));
  koaServer.use(webpackHotMiddleware(clientCompiler));
  koaServer.use(cookieParser.default());
  koaServer.use(tokenManager);
  koaServer.use(health);
  koaServer.use(webpackHotServerMiddleware(compiler));

  return koaServer;
};

const server = createServer();

// Listen incoming HTTP requests
const port = process.env.PORT || 3000;
let isBuilt = false;
compiler.plugin('done', () => {
  if (!isBuilt) {
    isBuilt = true;
    server.listen(port, () => {
      console.log(`Web Server listening on port: ${port}`);
    });
  }
});
