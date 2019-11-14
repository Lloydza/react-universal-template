/* eslint global-require: 0 */
import '@babel/polyfill';
import 'whatwg-fetch';
import React, { FunctionComponent } from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import 'app/content/styles/global.scss';
import RouteHandler from './routeHandler/index';
import configureStore from './store/configureStore';
import getHistory from './store/history';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = global.window.PRELOADED___STATE;

// Allow the passed state to be garbage-collected
delete global.window.PRELOADED___STATE;

const store = configureStore(preloadedState);
const history = getHistory();

const renderApp = (App: FunctionComponent<{ history: GenericObject }>): void => {
  return hydrate(
    <Provider store={store}>
      <App history={history} />
    </Provider>,
    document.getElementById('root'),
  );
};

if (module && module.hot) {
  hot(renderApp(RouteHandler));
  module.hot.accept(['./routeHandler'], () => {
    const NewRouteHandler = require('./routeHandler/index').default;
    renderApp(NewRouteHandler);
  });
} else {
  renderApp(RouteHandler);
}
