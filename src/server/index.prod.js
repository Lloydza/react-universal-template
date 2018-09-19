const express = require('express');
const compression = require('compression');

const logger = require('./middleware/logger');
const cors = require('./middleware/cors');
const forceSsl = require('./middleware/forceSsl');
const redirectSubdomains = require('./middleware/redirectSubdomains');

const clientConfigProd = require('../../webpack/client.prod');

const serverRender = require('../../dist/main.js').default;
const clientStats = require('../../dist/stats.json');

const app = express();
app.use(logger);
app.use(cors);
app.use(forceSsl);
app.use(redirectSubdomains);
app.use(compression());

app.use(express.static(clientConfigProd.output.publicPath));
app.use(express.static('dist/static'));

app.use(serverRender({ clientStats }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Web Server listening on port: ${port}`);
});
