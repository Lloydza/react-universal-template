/* eslint no-console: 0 */
import path from 'path';
import Express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import logger from './middleware/logger';
import clientConfig from '../../webpack.config';

const compiler = webpack(clientConfig);
const distPath = path.resolve(__dirname, '../../dist');

const createServer = (): Express.Application => {
  const serverInstance = Express();
  serverInstance.use(logger);
  serverInstance.use(Express.static('static', { maxAge: 365 * 24 * 60 * 60 * 1000 }));
  serverInstance.use(Express.static('dist/static', { maxAge: 365 * 24 * 60 * 60 * 1000 }));

  serverInstance.use(
    webpackDevMiddleware(compiler, {
      stats: false,
    }),
  );
  serverInstance.use(webpackHotMiddleware(compiler));

  serverInstance.get('*', (req: Express.Request, res: Express.Response) => {
    res.sendFile('index.html', { root: distPath }, (err: any) => {
      if (err) {
        console.log(`An error occured: ${err.status}`);
      }
    });
  });

  return serverInstance;
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
