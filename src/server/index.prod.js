const express = require('express');
const webpack = require('webpack');
const compression = require('compression');

const clientConfigProd = require('../../webpack/client.prod');
const serverConfigProd = require('../../webpack/server.prod');

const logger = require('./middleware/logger');
const cors = require('./middleware/cors');
const forceSsl = require('./middleware/forceSsl');
const redirectSubdomains = require('./middleware/redirectSubdomains');

const publicPath = clientConfigProd.output.publicPath;
const outputPath = clientConfigProd.output.path;

const app = express();
app.use(logger);
app.use(cors);
app.use(forceSsl);
app.use(redirectSubdomains);
app.use(compression());

webpack([clientConfigProd, serverConfigProd]).run((err, stats) => {
  const clientStats = stats.toJson().children[0];
  const serverRender = require('../../dist/main.js').default;

  app.use(publicPath, express.static(outputPath));
  app.use(serverRender({ clientStats }));

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log('Web Server listening on port: ' + port);
  });
});
