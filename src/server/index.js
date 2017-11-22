const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const compression = require('compression');

const clientConfig = require('../../webpack/client.dev');
const serverConfig = require('../../webpack/server.dev');
const clientConfigProd = require('../../webpack/client.prod');
const serverConfigProd = require('../../webpack/server.prod');

const logger = require('./middleware/logger');
const cors = require('./middleware/cors');
const config = require('../config');

const publicPath = clientConfig.output.publicPath;
const outputPath = clientConfig.output.path;
const isDevelopBuild = process.env.NODE_ENV === 'development';
const port = process.env.PORT || config.defaultPort;
const app = express();
app.use(logger);
app.use(cors);
app.use(compression());

let isBuilt = false;

const done = () => {
  if (!isBuilt) {
    app.listen(port, () => {
      isBuilt = true;
      console.log('BUILD COMPLETE -- Listening @ http://localhost:' + port);
    });
  }
};

if (isDevelopBuild) {
  const compiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = compiler.compilers[0];
  const options = { publicPath };

  app.use(webpackDevMiddleware(compiler, options));
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(webpackHotServerMiddleware(compiler));

  compiler.plugin('done', done);
}
else {
  webpack([clientConfigProd, serverConfigProd]).run((err, stats) => {
    const clientStats = stats.toJson().children[0];
    const serverRender = require('../../buildServer/main.js').default;

    app.use(publicPath, express.static(outputPath));
    app.use(serverRender({ clientStats }));

    done();
  });
}
