import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import createHistory from 'history/createMemoryHistory';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import renderDefaultPage from './default';
import RouteHandler from '../../app/components/routeHandler';
import configureStore from "../../app/store/configureStore";

export default function renderApp (req, res, clientStats, initialState, renderFunction) {
  const history = createHistory({ initialEntries: [req.path] })
  const store = configureStore(initialState);
  const preloadedState = store.getState();
  renderFunction = renderFunction || renderDefaultPage;

  const app = ReactDOM.renderToString(
    <Provider store={store}>
      <RouteHandler history={history} />
    </Provider>
  );

  const chunkNames = flushChunkNames()

  const {
    js,
    styles,
    cssHash,
    scripts,
    stylesheets
  } = flushChunks(clientStats, { chunkNames });

  const options = {
    js: js,
    styles: styles,
    cssHash: cssHash,
    scripts: scripts,
    stylesheets: stylesheets
  };

  res.send(renderFunction(app, preloadedState, options));
};