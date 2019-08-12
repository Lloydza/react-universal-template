const fs = require('fs');
const Koa = require('koa');
const compress = require('koa-compress');
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const Router = require('koa-router');
const logger = require('./middleware/logger');
const redirectSubdomains = require('./middleware/redirectSubdomains');
const health = require('./middleware/health');

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
  koaServer.use(compress());
  koaServer.use(serve('dist/static'));
  koaServer.use(redirectSubdomains);
  koaServer.use(health);
  koaServer.use(router.routes());
  koaServer.use(router.allowedMethods());

  return koaServer;
};

const server = createServer();

// Listen incoming HTTP requests
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`User Web Server listening on port: ${port}`);
});
