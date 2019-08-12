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
      return { ...state, user: action.user };
    case actions.UPDATE_SESSION_ACCESS_TOKEN:
      return { ...state, accessToken: action.accessToken };
    case actions.UPDATE_SESSION_REFRESH_TOKEN:
      return { ...state, accessToken: action.accessToken };
    default:
      return state;
  }
};
