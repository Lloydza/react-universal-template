// Logs all http requests
const logger = async (ctx, next) => {
  try {
    console.log(new Date(), ctx.method, ctx.url);
    await next();
  } catch (error) {
    console.error(error);
  }
};

module.exports = logger;
