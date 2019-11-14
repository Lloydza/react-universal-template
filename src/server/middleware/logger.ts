import Koa from 'koa';

// Logs all http requests
const logger = async (ctx: Koa.Context, next: Koa.Next): Promise<void> => {
  try {
    console.log(new Date(), ctx.method, ctx.url);
    await next();
  } catch (error) {
    console.error(error);
  }
};

export default logger;
