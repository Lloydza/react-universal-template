import { matchPath } from 'react-router';
import { findQueryParams } from 'app/utils/utilFunctions';
import routes from './serverRoutes';

// This function calls the static fetchData() function defined for the current page (if there is one).
// Pages for which to call the fetchData() are defined in serverRoutes.js
export const fetchAndAddRouteData = async (ctx, store) => {
  const wrappedComponent = getMatchedComponent(ctx);
  const options = Object.assign({}, wrappedComponent.params, { isServer: true });
  return wrappedComponent.component.fetchData(store, options);
};

// This function calls preset data fetches, no matter what route is hit (except error)
export const fetchAndAddGlobalData = async (ctx, store) => {
  const matchRoutePath = matchPath(ctx.request.path, '/error');
  if (matchRoutePath && matchRoutePath.isExact) {
    return;
  }

  const wrappedComponent = getMatchedComponent(ctx);
  const options = Object.assign({}, wrappedComponent.params, { isServer: true });

  // Put fetches here
  // await store.dispatch(getAndSetSomeGlobalSiteData(options));
};

// *** PRIVATE FUNCTIONS ***
const getMatchedComponent = (ctx) => {
  let wrappedComponent = null;
  routes.every((route) => {
    const matchRoutePath = matchPath(ctx.request.path, route.path);
    if (matchRoutePath && matchRoutePath.isExact && route.component.fetchData) {
      const params = Object.assign({}, findQueryParams(ctx.request.url), matchRoutePath.params);
      wrappedComponent = { component: route.component, params };
      return false;
    }

    return true;
  });

  if (!wrappedComponent) {
    wrappedComponent = { component: {}, params: {} };
  }

  if (!wrappedComponent.component.fetchData) {
    wrappedComponent.component.fetchData = () => {
      return new Promise((resolve) => {
        resolve(true);
      });
    };
  }

  return wrappedComponent;
};
