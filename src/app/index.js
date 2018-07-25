import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import RouteHandler from './routeHandler/index';
import configureStore from './store/configureStore';
const store = configureStore();

import './content/styles/global/main.css';

render(
  <Provider store={store}>
    <RouteHandler />
  </Provider>,
  document.getElementById('root')
);
