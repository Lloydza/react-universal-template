import { combineReducers } from 'redux';

import session from './session';
// TODO: add more reducers

const appReducer = combineReducers({
	session
});

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

module.exports = rootReducer;