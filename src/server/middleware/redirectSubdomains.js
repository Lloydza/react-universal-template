// Used to redirect if a request is made to the wrong sub-domain

const redirectDomains = [];

const redirectSubdomains = async (ctx, next) => {
  const { hostname, protocol, originalUrl } = ctx;
  if (redirectDomains.includes(hostname)) {
    ctx.status = 302;
    ctx.redirect(`${protocol}://www.${hostname}${originalUrl}`);
    return;
  }

  await next();
};

module.exports = redirectSubdomains;
