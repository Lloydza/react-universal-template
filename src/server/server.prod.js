require('./globals');
require('isomorphic-fetch');
const Koa = require('koa');
const compress = require('koa-compress');
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const cookieParser = require('koa-cookie');
const logger = require('./middleware/logger');
const redirectSubdomains = require('./middleware/redirectSubdomains');
const tokenManager = require('./middleware/tokenManager');
const health = require('./middleware/health');
const serverRender = require('./render/index');
const clientStats = require('../../dist/stats.json');

const createServer = () => {
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
  koaServer.use(cookieParser.default());
  koaServer.use(tokenManager);
  koaServer.use(health);
  koaServer.use(serverRender.default({ clientStats }));

  return koaServer;
};

const server = createServer();

// Listen incoming HTTP requests
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`User Web Server listening on port: ${port}`);
});
