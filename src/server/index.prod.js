import express from 'express'
import compression from 'compression';
import logger from './middleware/logger';
import cors from './middleware/cors';
import forceSsl from './middleware/forceSsl';
import redirectSubdomains from './middleware/redirectSubdomains';
import handleRender from './render/index';

// Create HTTP server
const app = new express();
app.use(logger);
app.use(cors);
app.use(forceSsl);
app.use(redirectSubdomains);
app.use(compression());

// Serve static files
app.use(express.static('dist/static'));

// Serve everything else through react-router
const clientStats = {}; // Would be needed for partial loading
app.use(handleRender({ clientStats }));

// Listen incoming HTTP requests
const port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('User Web Server listening on port: ' + port);
});