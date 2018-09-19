import { combineReducers } from 'redux';

import session from './session';

const appReducer = combineReducers({
  session,
});

const rootReducer = (state, action) => appReducer(state, action);

module.exports = rootReducer;
