import React from 'react';
import { matchPath } from 'react-router';
import universal from 'react-universal-component';

import Loading from 'app/components/fullPageLoader/index';
import NotFound from 'app/containers/notFoundPage/index';

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
      UniversalComponent = universal(import('app/containers/homePage/index'), {loading: Loading, error: null, minDelay: 1200 });
    }
    else if (matchOtherPage && matchOtherPage.isExact) {
      UniversalComponent = universal(import('app/containers/otherPage/index'), {loading: Loading, error: null, minDelay: 1200 });
    }
    else {
      renderedPage = <NotFound />;
    }

    return (
      <div>
        {renderedPage === null ? <UniversalComponent /> : renderedPage}
      </div>
    );
  }
}
