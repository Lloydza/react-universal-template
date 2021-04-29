/* eslint global-require: 0 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer, { defaultState } from './reducers/index';

export default (preloadedState: ReduxState = defaultState()): Store => {
  const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk)) as Store;

  if (module && module.hot) {
    module.hot.accept('./reducers', () => {
      const newRootReducer = require('./reducers').default;
      store.replaceReducer(newRootReducer);
    });
  }

  return store;
};
