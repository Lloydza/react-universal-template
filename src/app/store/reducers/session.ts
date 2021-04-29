import produce from 'immer';

import * as actions from 'app/store/actions';

export const defaultState = (): SessionState => {
  return {
    user: null,
    accessToken: null,
    refreshToken: null,
  };
};

export default (state: SessionState = defaultState(), action: ReduxAction): SessionState => {
  return produce(state, (draft: SessionState) => {
    switch (action.type) {
      case actions.UPDATE_SESSION_USER:
        draft.user = action.user;
        return draft;
      case actions.UPDATE_SESSION_ACCESS_TOKEN:
        draft.accessToken = action.accessToken;
        return draft;
      case actions.UPDATE_SESSION_REFRESH_TOKEN:
        draft.refreshToken = action.refreshToken;
        return draft;
      default:
        return state;
    }
  });
};
