import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import createHistory from 'history/createMemoryHistory';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import RouteHandler from 'app/routeHandler/index';
import configureStore from "app/store/configureStore";

export default function renderApp (req, res, clientStats, templateFunction, data) {
  const initialState = data.initialState || {};
  const store = configureStore(initialState);
  
  const history = createHistory({ initialEntries: [req.path] })

  const app = ReactDOM.renderToString(
    <Provider store={store}>
      <RouteHandler history={history} />
    </Provider>
  );

  // Grab the initial state from our Redux store
  const preloadedState = store.getState();

  const chunkNames = flushChunkNames()

  const {
    js,
    styles,
    cssHash,
    scripts,
    stylesheets
  } = flushChunks(clientStats, { chunkNames });

  data.options = data.options || {};
  const options = {
    ...data.options,
    js: js,
    styles: styles,
    cssHash: cssHash,
    scripts: scripts,
    stylesheets: stylesheets
  };

  res.send(templateFunction(app, preloadedState, options));
};