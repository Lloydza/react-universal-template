import React from 'react';
import PropTypes from 'prop-types';
import { matchPath } from 'react-router';
import universal from 'react-universal-component';

import Loading from 'app/components/fullPageLoader/index';
import NotFound from 'app/containers/notFoundPage/index';

// TODO: Add "oops, something went wrong page"
// TODO: Remove min delay

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
    console.log(111);
  }

  render() {
    let UniversalComponent;
    let renderedPage = null;
    const { path } = this.state;

    const matchHomePage = matchPath(path, '/');
    const matchOtherPage = matchPath(path, '/other');

    if (matchHomePage && matchHomePage.isExact) {
      UniversalComponent = universal(import('app/containers/homePage/index'), { loading: Loading, error: null, minDelay: 1200 });
    } else if (matchOtherPage && matchOtherPage.isExact) {
      UniversalComponent = universal(import('app/containers/otherPage/index'), { loading: Loading, error: null, minDelay: 1200 });
    } else {
      renderedPage = <NotFound />;
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
