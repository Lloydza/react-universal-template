import React from 'react';
import PropTypes from 'prop-types';
import { matchPath } from 'react-router';
import universal from 'react-universal-component';

import LoadingPage from 'app/components/fullPageLoader/index';
import NotFoundPage from 'app/containers/notFoundPage/index';
import ErrorPage from 'app/containers/errorPage/index';

class RouteHandler extends React.Component {
  constructor(props) {
    super(props);

    const { history } = props;
    const path = history.location.pathname;

    this.state = {
      path,
    };

    history.listen(({ pathname }) => {
      this.setState({ path: pathname });
    });
  }

  componentDidMount() {
    console.log('Web app is running.');
  }

  render() {
    let UniversalComponent;
    let renderedPage = null;
    const { path } = this.state;

    const matchHomePage = matchPath(path, '/');
    const matchOtherPage = matchPath(path, '/other');

    if (matchHomePage && matchHomePage.isExact) {
      UniversalComponent = universal(import('app/containers/homePage/index'), { loading: LoadingPage, error: ErrorPage, minDelay: 1200 });
    } else if (matchOtherPage && matchOtherPage.isExact) {
      UniversalComponent = universal(import('app/containers/otherPage/index'), { loading: LoadingPage, error: ErrorPage, minDelay: 1200 });
    } else {
      renderedPage = <NotFoundPage />;
    }

    return (
      <div>
        {renderedPage === null ? <UniversalComponent /> : renderedPage}
      </div>
    );
  }
}

RouteHandler.propTypes = {
  history: PropTypes.object.isRequired,
};

export default RouteHandler;
