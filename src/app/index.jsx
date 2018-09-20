import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';

import RouteHandler from './routeHandler/index';
import configureStore from './store/configureStore';
import getHistory from './store/history';

import './content/styles/global/main.css';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.PRELOADED___STATE;

// Allow the passed state to be garbage-collected
delete window.PRELOADED___STATE;

const store = configureStore(preloadedState);

const history = getHistory();

hydrate(
  <Provider store={store}>
    <RouteHandler history={history} />
  </Provider>,
  document.getElementById('root'),
);
