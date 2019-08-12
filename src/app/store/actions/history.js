import getHistory from 'app/store/history';
import { updateAppIsPageNotFound, setPageTitle } from 'app/store/actions';

export const CHANGE_ROUTE = 'CHANGE_ROUTE';
export const PREVIOUS_ROUTE = 'PREVIOUS_ROUTE';
export const SET_HISTORY_CURRENT_ROUTE = 'SET_HISTORY_CURRENT_ROUTE';

/**
 * Navigates the forward to the route if required, and/or shows confirm modal
 * @param  {String} newPathname : The new route
 */
export const manageChangeRoute = (newPathname) => {
  return (dispatch) => {
    dispatch(updateAppIsPageNotFound(false));

    const history = getHistory();
    const currentPathname = history.location.pathname + history.location.search;

    if (newPathname === currentPathname) {
      return;
    }

    history.push(newPathname);
    dispatch(changeRoute(newPathname));
    dispatch(setPageTitle(newPathname));
  };
};

/**
 * Navigates the back to the appropriate route, or otherwise handles the back click
 * @param  {String} newPathname : The new path name
 */
export const managePreviousRoute = ({ newPathname }) => {
  return (dispatch) => {
    dispatch(previousRoute());
    dispatch(setPageTitle(newPathname));
  };
};

/**
 * Fires off a redux event for the next route change
 * @param  {String} newPathname : The new route to navigate to
 */
export const changeRoute = (newPathname) => {
  return {
    type: CHANGE_ROUTE,
    newPathname,
  };
};

/**
 * Fires off a redux event for the previous route change
 */
export const previousRoute = () => {
  return {
    type: PREVIOUS_ROUTE,
  };
};
