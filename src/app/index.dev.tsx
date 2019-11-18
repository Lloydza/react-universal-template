/* eslint global-require: 0 */
import '@babel/polyfill';
import 'react-hot-loader';
import React, { FunctionComponent } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import 'app/content/styles/global.scss';
import { GRAPH_QL_URL } from 'utils/constants';
import RouteHandler from './routeHandler/index';
import configureStore from './store/configureStore';
import getHistory from './store/history';

const httpLink = createHttpLink({
  uri: GRAPH_QL_URL,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const store = configureStore();
const history = getHistory();

const renderApp = (App: FunctionComponent<{ history: GenericObject }>): void => {
  return render(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App history={history} />
      </Provider>
    </ApolloProvider>,
    document.getElementById('root'),
  );
};

renderApp(RouteHandler);

if (module && module.hot) {
  module.hot.accept(['./routeHandler'], () => {
    const NewRouteHandler = require('./routeHandler/index').default;
    renderApp(NewRouteHandler);
  });
}
