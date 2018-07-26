import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import createHistory from 'history/createMemoryHistory';

import configureStore from "app/store/configureStore";

import RouteHandler from "app/routeHandler/index";

export default function renderApp(req, res, templateFunction, data) {
  const initialState = data.initialState || {};
  const store = configureStore(initialState);

  const history = createHistory({ initialEntries: [req.path] });

  const app = ReactDOM.renderToString(
    <Provider store={store}>
      <RouteHandler history={history} />
    </Provider>
  );

    // Grab the initial state from our Redux store
    const preloadedState = store.getState();

    const options = data.options || {};
    
    res.send(templateFunction(app, preloadedState, options));
};
