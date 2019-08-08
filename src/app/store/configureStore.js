/* eslint global-require: 0 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

export default (preloadedState) => {
  const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk));

  if (module && module.hot) {
    module.hot.accept('./reducers', () => {
      const newRootReducer = require('./reducers').default;
      store.replaceReducer(newRootReducer);
    });
  }

  return store;
};
