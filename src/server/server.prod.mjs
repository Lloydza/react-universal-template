/* eslint no-console: 0 */
import fs from 'fs';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import Router from 'koa-router';

const createServer = () => {
  const router = new Router();
  router.get('*', async ctx => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('dist/static/index.html');
  });

  const koaServer = new Koa();
  koaServer.use(bodyParser());
  koaServer.use(serve('dist/static'));
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
