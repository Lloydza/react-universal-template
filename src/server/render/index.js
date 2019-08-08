import { DOMAIN } from 'app/utils/constants';
import configureStore from 'app/store/configureStore';
import renderApp from 'server/render/renderApp';
import renderDefaultPage from 'server/render/templates/default';
import { handleRouteRedirects } from 'server/render/logic/handleRedirects';
import { fetchAndAddRouteData, fetchAndAddGlobalData } from 'server/render/logic/handleDataFetches';
import {
  updateSessionUser,
  updateSessionAccessToken,
  updateSessionRefreshToken,
  changeRoute,
  setPageTitle,
  updateAppIsPageNotFound,
} from 'app/store/actions';

// Handle the rendering of the requested HTML page
// -> Redirects the user to the login page if trying to access a restricted route
// -> Redirects the user to the home page if trying to access a login-specific page while logged in
// -> Redirects if trying to access a client-side only page
// -> Set up the redux store for SSR
// -> Calls any fetches for the current route for the redux store
// -> Redirects if data for the route does not exist
// -> Builds dynamic meta tags for specific pages
// -> Calls the render function for the required template
export default ({ clientStats }) => {
  return async (ctx, next) => {
    try {
      // Create the redux store
      const initialState = {};
      const store = configureStore(initialState);
      if (ctx.request.user && ctx.request.accessToken && ctx.request.refreshToken) {
        store.dispatch(updateSessionUser(ctx.request.user));
        store.dispatch(updateSessionAccessToken(ctx.request.accessToken));
        store.dispatch(updateSessionRefreshToken(ctx.request.refreshToken));
      }

      // The current path needs to be added to the route path
      store.dispatch(changeRoute(ctx.request.url));
      store.dispatch(setPageTitle(ctx.request.url));

      // Handle potential route redirects
      const hasRouteRedirected = await handleRouteRedirects(ctx);
      if (hasRouteRedirected) {
        return;
      }

      // Fetch any global data
      await fetchAndAddGlobalData(ctx, store);

      // Fetch any route-specific data. Must be called AFTER global fetch.
      const fetchStatus = await fetchAndAddRouteData(ctx, store);

      // Set not found on invalid data
      if (!fetchStatus) {
        store.dispatch(updateAppIsPageNotFound(true));
      }

      renderApp(ctx, clientStats, renderDefaultPage, { store });
      await next();
    } catch (err) {
      console.log(err);
      ctx.status = 302;
      ctx.redirect(`${ctx.protocol}://${DOMAIN}/error`);
    }
  };
};
