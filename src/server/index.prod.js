const path = require('path');
const express = require('express');
const compression = require('compression');
const logger = require('./middleware/logger');
const cors = require('./middleware/cors');
const redirectSubdomains = require('./middleware/redirectSubdomains');
const forceSsl = require('./middleware/forceSsl');

var app = express();
app.use(logger);
app.use(cors);
app.use(redirectSubdomains);
app.use(forceSsl);
app.use(compression());

var file_path = path.join(__dirname, '../../dist/static');
app.use(express.static(file_path));

app.get('*', function(req, res) {
  res.set('X-FRAME-OPTIONS', 'DENY');
  res.sendFile(path.join(__dirname, '../../dist/static/index.html'));
});

var port = process.env.PORT || 3000;
app.listen(port, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  
  console.log('Listening on port: ' + port);
});
