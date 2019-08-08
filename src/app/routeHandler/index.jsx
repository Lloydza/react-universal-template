/* eslint no-shadow: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { findQueryParams } from 'app/utils/utilFunctions';
import { sessionStarted, managePreviousRoute } from 'app/store/actions';
import getLayout from './layoutImporter';
import getPage from './pageImporter';

// Route handler serves the correct page based on route
class RouteHandler extends React.Component {
  constructor(props) {
    super(props);

    const { history } = props;
    const { pathname, search } = history.location;
    this.state = { pathname, search };

    // History and routing is managed via the below listener
    history.listen(({ pathname, search }, action) => {
      const { pathname: currentPathname, search: currentSearch } = this.state;

      if (currentPathname + currentSearch === pathname + search) {
        return;
      }

      if (action === 'POP') {
        const { onManagePreviousRoute } = this.props;
        onManagePreviousRoute(
          {
            history,
            currentPathname,
            currentSearch,
            newPathname: pathname,
            newSearch: search,
          },
          () => {
            this.setState({ pathname, search });
          },
        );
      } else {
        this.setState({ pathname, search });
      }
    });
  }

  componentDidMount() {
    const { onSessionStarted } = this.props;
    onSessionStarted();
  }

  render() {
    const { isPageNotFound } = this.props;
    const { pathname, search } = this.state;

    const { Page, pageParams } = getPage(pathname, isPageNotFound);
    const Layout = getLayout(pathname);

    const queryParams = findQueryParams(search);
    const props = Object.assign({}, queryParams, pageParams);

    return (
      <Layout>
        <Page {...props} />
      </Layout>
    );
  }
}

RouteHandler.propTypes = {
  history: PropTypes.object.isRequired,
  isPageNotFound: PropTypes.bool.isRequired,
  onSessionStarted: PropTypes.func.isRequired,
  onManagePreviousRoute: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isMobile: state.app.isMobile,
    isPageNotFound: state.app.isPageNotFound,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSessionStarted: () => {
      dispatch(sessionStarted());
    },
    onManagePreviousRoute: (options, callback) => {
      dispatch(managePreviousRoute(options, callback));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RouteHandler);
