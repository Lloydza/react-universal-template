/* eslint no-shadow: 0 */
import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { findQueryParams } from 'app/utils/utilFunctions';
import { sessionStarted, managePreviousRoute } from 'app/store/actions';
import getLayout from './layoutImporter';
import getPage from './pageImporter';

// Route handler serves the correct page based on route
const RouteHandler = ({ history, isPageNotFound, onSessionStarted, onManagePreviousRoute }) => {
  const [pathname, setPathname] = useState(history.location.pathname);
  const [search, setSearch] = useState(history.location.search);

  useEffect(() => {
    onSessionStarted();
  }, []);

  useEffect(() => {
    const unlisten = history.listen(({ pathname: newPathname, search: newSearch }, action) => {
      if (pathname + search === newPathname + newSearch) {
        return;
      }

      if (action === 'POP') {
        onManagePreviousRoute(
          {
            history,
            currentPathname: pathname,
            currentSearch: search,
            newPathname,
            newSearch,
          },
          () => {
            setPathname(newPathname);
            setSearch(newSearch);
          },
        );
      } else {
        setPathname(newPathname);
        setSearch(newSearch);
      }
    });

    return () => {
      unlisten();
    };
  }, [pathname, search]);

  const { Page, pageParams } = getPage(pathname, isPageNotFound);
  const Layout = getLayout(pathname);

  const queryParams = findQueryParams(search);
  const props = {
    ...queryParams,
    ...pageParams,
  };

  return (
    <Layout>
      <Page {...props} />
    </Layout>
  );
};

RouteHandler.propTypes = {
  history: PropTypes.object.isRequired,
  isPageNotFound: PropTypes.bool.isRequired,
  onSessionStarted: PropTypes.func.isRequired,
  onManagePreviousRoute: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
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

export default memo(connect(mapStateToProps, mapDispatchToProps)(RouteHandler));
