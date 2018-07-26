import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';

import RouteHandler from './routeHandler/index';
import configureStore from './store/configureStore';
import getHistory from './store/history';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

const store = configureStore(preloadedState);
let history = getHistory();

import './content/styles/global/main.css';

hydrate(
  <Provider store={store}>
    <RouteHandler history={history} />
  </Provider>,
  document.getElementById('root')
);
