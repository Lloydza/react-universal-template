import app from './app';
import history from './history';
import session from './session';

// Using a custom combineReducers() here, so that we can pass the sessionUser down
// This way, each reducer has access to the session user
const appReducer = (state = {}, action) => {
  const sessionUser = state.session ? state.session.user : null;
  return {
    app: app(state.app, action, sessionUser),
    history: history(state.history, action, sessionUser),
    session: session(state.session, action, sessionUser),
  };
};

export default (state, action) => {
  return appReducer(state, action);
};
