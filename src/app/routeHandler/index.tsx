import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { findQueryParams } from 'app/utils/utilFunctions';
import { sessionStarted, managePreviousRoute, ManagePreviousRouteOptions } from 'app/store/actions';
import getLayout from './layoutImporter';
import getPage from './pageImporter';

// Route handler serves the correct page based on route
interface RouteHandlerProps {
  history: GenericObject;
  isPageNotFound: boolean;
  onSessionStarted: () => void;
  onManagePreviousRoute: (options: ManagePreviousRouteOptions, onSuccess: () => void) => void;
}
interface HistoryProps {
  pathname: string;
  search: string;
}
const RouteHandler = ({
  history,
  isPageNotFound,
  onSessionStarted,
  onManagePreviousRoute,
}: RouteHandlerProps): JSX.Element => {
  const [pathname, setPathname] = useState(history.location.pathname);
  const [search, setSearch] = useState(history.location.search);

  useEffect(() => {
    onSessionStarted();
  }, []);

  useEffect(() => {
    const unlisten = history.listen(({ pathname: newPathname, search: newSearch }: HistoryProps, action: string) => {
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

    return (): void => {
      unlisten();
    };
  }, [pathname, search]);

  const { Page, pageParams } = getPage({ pathname, isPageNotFound });
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

const mapStateToProps = (state: ReduxState): GenericObject => {
  return {
    isPageNotFound: state.app.isPageNotFound,
  };
};

const mapDispatchToProps = {
  onSessionStarted: sessionStarted,
  onManagePreviousRoute: managePreviousRoute,
};

export default memo(connect(mapStateToProps, mapDispatchToProps)(RouteHandler));
