import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from 'react-hot-loader/lib/AppContainer';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import RouteHandler from './components/routeHandler';
import getHistory from './history';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

let store = configureStore(preloadedState);
let history = getHistory();

const render = RouteHandler =>
  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={store}>
        <RouteHandler history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./components/routeHandler.js', () => {
    const RouteHandler = require('./components/routeHandler').default
    render(RouteHandler)
  })
}

render(RouteHandler)
