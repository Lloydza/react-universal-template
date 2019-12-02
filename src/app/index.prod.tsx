/* eslint global-require: 0 */
import React, { FunctionComponent } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'app/content/styles/global.css';
import RouteHandler from './routeHandler/index';
import configureStore from './store/configureStore';
import getHistory from './store/history';

const store = configureStore();
const history = getHistory();

const renderApp = (App: FunctionComponent<{ history: GenericObject }>): void => {
  return render(
    <Provider store={store}>
      <App history={history} />
    </Provider>,
    document.getElementById('root'),
  );
};

renderApp(RouteHandler);
