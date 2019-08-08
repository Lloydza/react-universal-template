/* eslint global-require: 0 */
import '@babel/polyfill';
import 'whatwg-fetch';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import 'app/content/styles/global.scss';
import RouteHandler from './routeHandler/index';
import configureStore from './store/configureStore';
import getHistory from './store/history';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.PRELOADED___STATE;

// Allow the passed state to be garbage-collected
delete window.PRELOADED___STATE;

const store = configureStore(preloadedState);

const history = getHistory();

const render = (App) => {
  return hydrate(
    <Provider store={store}>
      <App history={history} />
    </Provider>,
    document.getElementById('root'),
  );
};

render(RouteHandler);
