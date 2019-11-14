import Koa from 'koa';
import KoaRouter from 'koa-router';

const router = new KoaRouter();

// Return 200 for /health check
router.get('/health', async (ctx: Koa.Context, next: Koa.Next) => {
  ctx.status = 200;
  ctx.body = '';
  await next();
});

export default router.routes();
