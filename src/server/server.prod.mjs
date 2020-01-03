/* eslint no-console: 0 */
import Express from 'express';

const createServer = () => {
  const serverInstance = Express();
  serverInstance.use(Express.static('dist/static', { maxAge: 365 * 24 * 60 * 60 * 1000 }));

  serverInstance.get('*', (req, res) => {
    res.sendFile('index.html', { root: 'dist' }, err => {
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
server.listen(port, () => {
  console.log(`User Web Server listening on port: ${port}`);
});
