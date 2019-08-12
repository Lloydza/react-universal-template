const fs = require('fs');
const Koa = require('koa');
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const Router = require('koa-router');
const webpack = require('webpack');
const webpackDevMiddleware = require('koa-webpack-dev-middleware');
const webpackHotMiddleware = require('koa-webpack-hot-middleware');
const logger = require('./middleware/logger');
const redirectSubdomains = require('./middleware/redirectSubdomains');
const health = require('./middleware/health');

const clientConfig = require('../../webpack/client.dev.js');

const compiler = webpack(clientConfig);

const createServer = () => {
  const router = new Router();
  router.get('*', async (ctx) => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('dist/static/index.html');
  });

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
  koaServer.use(webpackDevMiddleware(compiler));
  koaServer.use(webpackHotMiddleware(compiler));
  koaServer.use(health);
  koaServer.use(router.routes());
  koaServer.use(router.allowedMethods());

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
