import React from 'react';
import { matchPath } from 'react-router';
import universal from 'react-universal-component';

import HandleStart from '../other/handleStart';

import Loading from './loading/index';
import NotFound from './notFound/index';

export default class RouteHandler extends React.Component {
  constructor(props) {
    super(props);

    const { history } = props;
    const path = history.location.pathname;

    this.state = {
      path: path
    }

    history.listen(({ pathname }) => {
      this.setState({ path: pathname })
    });
  }

  render() {
    var UniversalComponent;
    var renderedPage = null;
    var pathToMatch = this.state.path;

    var matchHomePage = matchPath(pathToMatch, '/');
    var matchOtherPage = matchPath(pathToMatch, '/other');

    if (matchHomePage && matchHomePage.isExact) {
      UniversalComponent = universal(import('./home/index'), {loading: Loading, error: null, minDelay: 1200 });
    }
    else if (matchOtherPage && matchOtherPage.isExact) {
      UniversalComponent = universal(import('./other/index'), {loading: Loading, error: null, minDelay: 1200 });
    }
    else {
      renderedPage = <NotFound />;
    }

    return (
      <div>
        <HandleStart />
        {renderedPage === null ? <UniversalComponent /> : renderedPage}
      </div>
    );
  }
}
