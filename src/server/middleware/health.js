const KoaRouter = require('koa-router');

const router = new KoaRouter();

// Return 200 for /health check
router.get('/health', async (ctx, next) => {
  ctx.status = 200;
  ctx.body = '';
  await next();
});

module.exports = router.routes();
