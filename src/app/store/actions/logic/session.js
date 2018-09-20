export const UPDATE_SESSION_HAS_LOADED = 'UPDATE_SESSION_HAS_LOADED';
export const UPDATE_SESSION_SET_INTIAL_ROUTE = 'UPDATE_SESSION_SET_INTIAL_ROUTE';

const updateSessionHasLoaded = (hasLoaded) => {
  return {
    type: UPDATE_SESSION_HAS_LOADED,
    hasLoaded,
  };
};
exports.updateSessionHasLoaded = updateSessionHasLoaded;

const updateSessionSetInitialRoute = (initialRoute) => {
  return {
    type: UPDATE_SESSION_SET_INTIAL_ROUTE,
    initialRoute,
  };
};
exports.updateSessionSetInitialRoute = updateSessionSetInitialRoute;

const loadSession = (currentRoute) => {
  return (dispatch) => {
  // Example async usage
  // Add in any session logic or other async logic here
  // NOTE: We don't call this in SSR, as its already setup when coming from the server
    setTimeout(() => {
      dispatch(updateSessionSetInitialRoute(currentRoute));
      dispatch(updateSessionHasLoaded(true));
    }, 1000);
  };
};
exports.loadSession = loadSession;
