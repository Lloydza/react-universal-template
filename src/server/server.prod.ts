import fs from 'fs';
import Koa from 'koa';
import compress from 'koa-compress';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import Router from 'koa-router';
import logger from './middleware/logger';
import redirectSubdomains from './middleware/redirectSubdomains';
import health from './middleware/health';

const createServer = (): Koa => {
  const router = new Router();
  router.get('*', async (ctx: Koa.Context) => {
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
