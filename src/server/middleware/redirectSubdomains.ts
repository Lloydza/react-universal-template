import Koa from 'koa';

// Used to redirect if a request is made to the wrong sub-domain
const redirectDomains = [];
const redirectSubdomains = async (ctx: Koa.Context, next: Koa.Next): Promise<void> => {
  const { hostname, protocol, originalUrl } = ctx;
  if (redirectDomains.includes(hostname)) {
    ctx.status = 302;
    ctx.redirect(`${protocol}://www.${hostname}${originalUrl}`);
    return;
  }

  await next();
};

export default redirectSubdomains;
