import { PATH_PAGE_TITLES, DEFAULT_META } from 'utils/constants';
import { createReduxActions } from 'utils/utilFunctions';

export const UPDATE_APP_IS_LOADING = 'UPDATE_APP_IS_LOADING';
export const UPDATE_APP_IS_PAGE_NOT_FOUND = 'UPDATE_APP_IS_PAGE_NOT_FOUND';
export const UPDATE_PAGE_TITLE = 'UPDATE_PAGE_TITLE';

export const [updateAppIsLoading, updateAppIsPageNotFound, updatePageTitle] = createReduxActions(
  { type: UPDATE_APP_IS_LOADING, key: 'isLoading' },
  { type: UPDATE_APP_IS_PAGE_NOT_FOUND, key: 'isPageNotFound' },
  { type: UPDATE_PAGE_TITLE, key: 'pageTitle' },
);

/**
 * Sets the page title
 * @param  {String} pathname : The path name to match to the page title
 */
export const setPageTitle = (pathname: string) => (dispatch: Dispatch): void => {
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
