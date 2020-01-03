/* eslint no-console: 0 */
import Express from 'express';

// Logs all http requests
const logger = (req: Express.Request, res: Express.Response, next: Express.NextFunction): void => {
  try {
    console.log(new Date(), req.method, req.url);
    next();
  } catch (error) {
    console.error(error);
  }
};

export default logger;
