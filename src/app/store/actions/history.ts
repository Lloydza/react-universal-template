import { IS_SERVER } from 'utils/constants';
import { createReduxActions } from 'utils/utilFunctions';
import getHistory from 'app/store/history';
import { updateAppIsPageNotFound, setPageTitle } from 'app/store/actions';

export const CHANGE_ROUTE = 'CHANGE_ROUTE';
export const PREVIOUS_ROUTE = 'PREVIOUS_ROUTE';

export const [changeRoute, previousRoute] = createReduxActions(
  { type: CHANGE_ROUTE, key: 'newPathname' },
  { type: PREVIOUS_ROUTE },
);

/**
 * Navigates the forward to the route if required, and/or shows confirm modal
 * @param  {String} newPathname : The new route
 */
export const manageChangeRoute = (newPathname: string) => {
  return (dispatch: Dispatch): void => {
    if (!IS_SERVER) {
      dispatch(updateAppIsPageNotFound(false));

      const history = getHistory();
      const currentPathname = history.location.pathname + history.location.search;

      if (newPathname === currentPathname) {
        return;
      }

      history.push(newPathname);
      dispatch(changeRoute(newPathname));
      dispatch(setPageTitle(newPathname));
    }
  };
};

/**
 * Navigates the back to the appropriate route, or otherwise handles the back click
 * @param  {String} newPathname : The new path name
 */
export interface ManagePreviousRouteOptions {
  history: GenericObject;
  currentPathname: string;
  currentSearch: string;
  newPathname: string;
  newSearch: string;
}
export const managePreviousRoute = ({ newPathname }: ManagePreviousRouteOptions, onSuccess: () => void) => {
  return (dispatch: Dispatch): void => {
    if (!IS_SERVER) {
      // If you are not wanting to nav back but instead show a warning for this route (for example),
      // then you wouldn't call the below until the user clicks okay
      dispatch(previousRoute());
      dispatch(setPageTitle(newPathname));
      onSuccess();
    }
  };
};
