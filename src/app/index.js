import "babel-polyfill";
import "isomorphic-fetch";
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import routes from './routes';
import configureStore from './store/configureStore';
import getHistory from './history';

import './content/styles/global.css';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

const store = configureStore(preloadedState);

let history = getHistory();

render(
  <Provider store={store}>
  	<Router history={history}>
  		{routes}
  	</Router>
  </Provider>,
  document.getElementById('root')
);