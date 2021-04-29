import './globals';
import 'isomorphic-fetch';
import Koa from 'koa';
import compress from 'koa-compress';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import cookieParser from 'koa-cookie';
import logger from './middleware/logger';
import redirectSubdomains from './middleware/redirectSubdomains';
import tokenManager from './middleware/tokenManager';
import health from './middleware/health';
import serverRender from './render';

// This needs to be require, as the file does not exist until build
const clientStats = require('../../dist/stats.json');

const createServer = (): Koa => {
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
  koaServer.use(cookieParser());
  koaServer.use(tokenManager);
  koaServer.use(health);
  koaServer.use(serverRender({ clientStats }));

  return koaServer;
};

const server = createServer();

// Listen incoming HTTP requests
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`User Web Server listening on port: ${port}`);
});
