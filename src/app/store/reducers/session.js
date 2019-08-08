import * as actions from 'app/store/actions';

const defaultState = () => {
  return {
    user: null,
    accessToken: null,
    refreshToken: null,
  };
};

export default (state = defaultState(), action) => {
  switch (action.type) {
    case actions.UPDATE_SESSION_USER:
      return Object.assign({}, state, {
        user: action.user,
      });
    case actions.UPDATE_SESSION_ACCESS_TOKEN:
      return Object.assign({}, state, {
        accessToken: action.accessToken,
      });
    case actions.UPDATE_SESSION_REFRESH_TOKEN:
      return Object.assign({}, state, {
        accessToken: action.accessToken,
      });
    default:
      return state;
  }
};
