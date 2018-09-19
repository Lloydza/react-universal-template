const webpack = require('webpack');

const clientConfigProd = require('../../webpack/client.prod.js');
const serverConfigProd = require('../../webpack/server.prod.js');

webpack([clientConfigProd, serverConfigProd]).run(() => {
  console.log('Build Complete');
});
