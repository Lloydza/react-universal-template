import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from "react-router";
import configureStore from "../../../app/store/configureStore";
import routes from '../../../app/routes';
import renderDefaultPage from '../default';

export default function renderHomePage(req, res) {
  // Create a new Redux store instance
    const initialState = { session: { serverPage: "home" } };
    const store = configureStore(initialState);

    // Render the component to a string
    const context = {};
    const html = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
         {routes}
        </StaticRouter>
      </Provider>
    );

    // Grab the initial state from our Redux store
    const preloadedState = store.getState();

    res.send(renderDefaultPage(html, preloadedState));
};