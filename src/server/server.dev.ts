import './globals';
import 'isomorphic-fetch';
import Koa from 'koa';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import webpack from 'webpack';
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';
import webpackHotServerMiddleware from 'koa-webpack-hot-server';
import cookieParser from 'koa-cookie';
import logger from './middleware/logger';
import redirectSubdomains from './middleware/redirectSubdomains';
import tokenManager from './middleware/tokenManager';
import health from './middleware/health';
import clientConfig from '../../webpack/client.dev';
import serverConfig from '../../webpack/server.dev';

const compiler = webpack([clientConfig, serverConfig]);
const clientCompiler = compiler.compilers[0];
const options = {
  serverSideRender: true,
  hot: true,
};

const createServer = (): Koa => {
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
  koaServer.use(cookieParser());
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
