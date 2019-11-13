import produce from 'immer';

import * as actions from 'app/store/actions';
import { findQueryParams } from 'app/utils/utilFunctions';

export const defaultState = (): HistoryState => {
  return { stack: [], currentRoute: '/', currentQueryParams: {} };
};

export default (state: HistoryState = defaultState(), action: ReduxAction): HistoryState => {
  return produce(state, (draft: HistoryState) => {
    switch (action.type) {
      case actions.CHANGE_ROUTE: {
        if (state.currentRoute === action.newPathname) {
          return state;
        }

        const currentQueryParams = findQueryParams(action.newPathname);
        draft.stack.push({ route: action.newPathname, queryParams: currentQueryParams });
        draft.currentRoute = action.newPathname;
        draft.currentQueryParams = currentQueryParams;
        return draft;
      }
      case actions.PREVIOUS_ROUTE:
        if (state.stack.length === 0) {
          return state;
        }

        draft.stack.pop();
        draft.currentRoute = draft.stack.length > 0 ? draft.stack[draft.stack.length - 1].route : '/';
        draft.currentQueryParams = draft.stack.length > 0 ? draft.stack[draft.stack.length - 1].queryParams : {};
        return draft;
      default:
        return state;
    }
  });
};
