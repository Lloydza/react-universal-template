import { LOGIN_PAGES, RESTRICTED_PAGES, LANDING_PAGE_ROUTE, DOMAIN } from 'app/utils/constants';

// Redirect if route is not allowed.
// This could be because:
//    -> You are not logged in
//    -> You are logged in but you are trying to access a login-only route
//    -> It's a client-side only route
export const handleRouteRedirects = async (ctx) => {
  if (ctx.request.user) {
    if (LOGIN_PAGES[ctx.request.path]) {
      ctx.status = 302;
      ctx.redirect(`${ctx.protocol}://${DOMAIN}${LANDING_PAGE_ROUTE}`);
      return true;
    }
  } else if (RESTRICTED_PAGES[ctx.request.path]) {
    ctx.status = 302;
    ctx.redirect(`${ctx.protocol}://${DOMAIN}${LANDING_PAGE_ROUTE}`);
    return true;
  }

  // Redirect if trying to access a client-side only page
  // ***********
  // ***********

  return false;
};
