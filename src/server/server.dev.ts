import fs from 'fs';
import Koa from 'koa';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import Router from 'koa-router';
import webpack from 'webpack';
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';
import logger from './middleware/logger';
import redirectSubdomains from './middleware/redirectSubdomains';
import health from './middleware/health';
import clientConfig from '../../webpack/client.dev';

const compiler = webpack(clientConfig);

const createServer = (): Koa => {
  const router = new Router();
  router.get(
    '*',
    async (ctx: Koa.Context): Promise<void> => {
      ctx.type = 'html';
      ctx.body = fs.createReadStream('dist/static/index.html');
    },
  );

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
