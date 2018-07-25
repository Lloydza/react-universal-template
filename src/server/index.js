import express from 'express'
import compression from 'compression';
import path from 'path';
import logger from './middleware/logger';
import cors from './middleware/cors';
import handleRender from './render/index';
import config from '../config';

// Create HTTP server
const app = new express();
app.use(logger);
app.use(cors);
app.use(compression());

// Serve static files
var file_path = path.join(__dirname, '../../build/dist');
app.use(express.static(file_path));

// Serve everything else through react-router
app.use(handleRender);

// Listen incoming HTTP requests
const port = process.env.PORT || config.defaultPort;
app.listen(port, function(){
  console.log('User Web Server listening on port: ' + port);
});