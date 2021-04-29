import produce from 'immer';

import * as actions from 'app/store/actions';
import { DEFAULT_META } from 'utils/constants';

export const defaultState = (): AppState => {
  return {
    isLoading: false,
    isPageNotFound: false,
    pageTitle: DEFAULT_META.TITLE,
  };
};

const appReducer = (state: AppState = defaultState(), action: ReduxAction): AppState => {
  return produce(state, (draft: AppState) => {
    switch (action.type) {
      case actions.UPDATE_APP_IS_LOADING:
        if (state.isLoading === action.isLoading) {
          return state;
        }

        draft.isLoading = action.isLoading;
        return draft;
      case actions.UPDATE_APP_IS_PAGE_NOT_FOUND:
        if (state.isPageNotFound === action.isPageNotFound) {
          return state;
        }

        draft.isPageNotFound = action.isPageNotFound;
        return draft;
      case actions.UPDATE_PAGE_TITLE:
        if (state.pageTitle === action.pageTitle) {
          return state;
        }
        draft.pageTitle = action.pageTitle;
        return draft;
      default:
        return state;
    }
  });
};

export default appReducer;
