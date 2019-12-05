import app, { defaultState as appDefaultState } from './app';
import history, { defaultState as historyDefaultState } from './history';
import session, { defaultState as sessionDefaultState } from './session';

// Using a custom combineReducers() here, so that we can pass the sessionUser down
// This way, each reducer has access to the session user
export const defaultState = (): ReduxState => ({
  app: appDefaultState(),
  history: historyDefaultState(),
  session: sessionDefaultState(),
});
const appReducer = (state: ReduxState = defaultState(), action: ReduxAction): ReduxState =>
  // Can pass in state.session.user to a specific reducer if it requires user context
  ({
    app: app(state.app, action),
    history: history(state.history, action),
    session: session(state.session, action),
  });

export default (state: ReduxState, action: ReduxAction): ReduxState => appReducer(state, action);
