import * as actions from 'app/store/actions';
import { DEFAULT_META } from 'app/utils/constants';

const defaultState = () => {
  return {
    isLoading: false,
    isPageNotFound: false,
    pageTitle: DEFAULT_META.TITLE,
  };
};

export default (state = defaultState(), action) => {
  switch (action.type) {
    case actions.UPDATE_APP_IS_LOADING:
      if (state.isLoading === action.isLoading) {
        return state;
      }

      return Object.assign({}, state, {
        isLoading: action.isLoading,
      });
    case actions.UPDATE_APP_IS_PAGE_NOT_FOUND:
      if (state.isPageNotFound === action.isPageNotFound) {
        return state;
      }

      return Object.assign({}, state, {
        isPageNotFound: action.isPageNotFound,
      });
    case actions.UPDATE_PAGE_TITLE:
      return Object.assign({}, state, {
        pageTitle: action.pageTitle,
      });
    default:
      return state;
  }
};
