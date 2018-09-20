import { combineReducers } from 'redux';

import session from './session';

const appReducer = combineReducers({
  session,
});

export default (state, action) => { return appReducer(state, action); };
