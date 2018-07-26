const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

const logger = require('./middleware/logger');
const cors = require('./middleware/cors');

const clientConfig = require('../../webpack/client.dev.js');
const serverConfig = require('../../webpack/server.dev.js');
const publicPath = clientConfig.output.publicPath;

// Create HTTP server
const app = new express();
app.use(logger);
app.use(cors);

const compiler = webpack([clientConfig, serverConfig]);
const clientCompiler = compiler.compilers.find(compiler => compiler.name === 'client');
const options = { publicPath, serverSideRender: true };

app.use(webpackDevMiddleware(compiler, options));
app.use(webpackHotMiddleware(clientCompiler));
app.use(webpackHotServerMiddleware(compiler));

const port = process.env.PORT || 3000;
let isBuilt = false;
compiler.plugin('done', function () {
    if (!isBuilt) {
        app.listen(port, () => {
          isBuilt = true;
          console.log('Web Server listening on port: ' + port);
        });
    }
});
