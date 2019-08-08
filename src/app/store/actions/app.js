import { PATH_PAGE_TITLES, DEFAULT_META } from 'app/utils/constants';

export const UPDATE_APP_IS_LOADING = 'UPDATE_APP_IS_LOADING';
export const UPDATE_APP_IS_PAGE_NOT_FOUND = 'UPDATE_APP_IS_PAGE_NOT_FOUND';
export const UPDATE_PAGE_TITLE = 'UPDATE_PAGE_TITLE';

/**
 * Call an action to set the entire app into a loading state (and thus show the loading spinner)
 * @param  {Boolean} isLoading : Whether the app should be loading or not
 * @return {Object} : The resulting redux action
 */
export const updateAppIsLoading = (isLoading) => {
  return {
    type: UPDATE_APP_IS_LOADING,
    isLoading,
  };
};

/**
 * Sets the page as "not found". Called by the server to when their is no data for the route or the route doesn't exist
 * @param  {Boolean} isPageNotFound : The page not found indicator
 * @return {Object} : The resulting redux action
 */
export const updateAppIsPageNotFound = (isPageNotFound) => {
  return {
    type: UPDATE_APP_IS_PAGE_NOT_FOUND,
    isPageNotFound,
  };
};

/**
 * Sets the page title
 * @param  {String} pathname : The path name to match to the page title
 */
export const setPageTitle = (pathname) => {
  return async (dispatch) => {
    try {
      const cleanedPathname = pathname.split('?')[0];
      const pageTitle = PATH_PAGE_TITLES[cleanedPathname] || DEFAULT_META.TITLE;
      if (typeof document !== 'undefined' && document) {
        document.title = pageTitle;
      }

      dispatch(updatePageTitle(pageTitle));
    } catch {
      // Do nothing
    }
  };
};

/**
 * Sets the page title
 * @param  {String} pageTitle : The page title
 * @return {Object} : The resulting redux action
 */
const updatePageTitle = (pageTitle) => {
  return {
    type: UPDATE_PAGE_TITLE,
    pageTitle,
  };
};
