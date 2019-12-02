/* eslint global-require: 0 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { setPageTitle } from 'app/store/actions';
import rootReducer, { defaultState } from 'app/store/reducers/index';

interface Store {
  dispatch: Dispatch;
  getState: GetState;
  replaceReducer: (reducer: any) => void;
}

export default (preloadedState: ReduxState = defaultState()): Store => {
  const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk)) as Store;

  const { currentRoute } = store.getState().history;
  store.dispatch(setPageTitle(currentRoute));

  if (module && module.hot) {
    module.hot.accept('./reducers', () => {
      const newRootReducer = require('./reducers').default;
      store.replaceReducer(newRootReducer);
    });
  }

  return store;
};
