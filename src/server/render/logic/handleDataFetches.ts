import Koa from 'koa';
import { matchPath } from 'react-router';
import { findQueryParams } from 'utils/utilFunctions';
import routes from './serverRoutes';

// This function calls the static fetchData() function defined for the current page (if there is one).
// Pages for which to call the fetchData() are defined in serverRoutes.js
export const fetchAndAddRouteData = async (ctx: Koa.Context, store: Store): Promise<boolean> => {
  const wrappedComponent = getMatchedComponent(ctx);
  const options = { ...wrappedComponent.params, isServer: true };
  return wrappedComponent.serverFetchData(store, options);
};

// This function calls preset data fetches, no matter what route is hit
export const fetchAndAddGlobalData = async (ctx: Koa.Context, store: Store): Promise<void> => {
  const wrappedComponent = getMatchedComponent(ctx);
  const options = { ...wrappedComponent.params, isServer: true };

  // Put fetches here
  console.log(!!store, !!options);
  // await store.dispatch(getAndSetSomeGlobalSiteData(options));
};

// *** PRIVATE FUNCTIONS ***
type ServerFetchData = (store: Store, options: GenericObject) => Promise<boolean>;
interface WrappedComponent {
  serverFetchData: ServerFetchData;
  params: GenericObject;
}
interface ServerRoute {
  path: string;
  serverFetchData: ServerFetchData;
}
const getMatchedComponent = (ctx: Koa.Context): WrappedComponent => {
  let wrappedComponent = null;
  routes.every((route: ServerRoute) => {
    const matchRoutePath = matchPath(ctx.request.path, route.path);
    if (matchRoutePath && matchRoutePath.isExact && route.serverFetchData) {
      const params = { ...findQueryParams(ctx.request.url), ...matchRoutePath.params };
      wrappedComponent = { serverFetchData: route.serverFetchData, params };
      return false;
    }

    return true;
  });

  if (!wrappedComponent) {
    wrappedComponent = {
      params: {},
      serverFetchData: async (): Promise<boolean> => {
        return true;
      },
    };
  }

  return wrappedComponent;
};
