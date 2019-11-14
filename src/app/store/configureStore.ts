/* eslint global-require: 0 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { findQueryParams } from 'utils/utilFunctions';
import { setPageTitle } from './actions';
import { defaultState as defaultHistoryState } from './reducers/history';
import getHistory from './history';
import rootReducer from './reducers/index';

const history = getHistory();
const { pathname, search } = history.location;
const currentRoute = `${pathname}${search}`;
const currentQueryParams = findQueryParams(currentRoute);

interface Store {
  dispatch: Dispatch;
  getState: GetState;
  replaceReducer: (reducer: any) => void;
}

export default (): Store => {
  const store = createStore(
    rootReducer,
    { history: { ...defaultHistoryState(), currentRoute, currentQueryParams } },
    applyMiddleware(thunk),
  ) as Store;

  store.dispatch(setPageTitle(currentRoute));

  if (module && module.hot) {
    module.hot.accept('./reducers', () => {
      const newRootReducer = require('./reducers').default;
      store.replaceReducer(newRootReducer);
    });
  }

  return store;
};
