import React, { memo, useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { findQueryParams } from 'utils/utilFunctions';
import { sessionStarted, managePreviousRoute, ManagePreviousRouteOptions } from 'app/store/actions';
import getLayout from './layoutImporter';
import getPage from './pageImporter';

// Route handler serves the correct page based on route
interface RouteHandlerProps {
  history: GenericObject;
}
interface HistoryProps {
  pathname: string;
  search: string;
}
const RouteHandler = ({ history }: RouteHandlerProps): JSX.Element => {
  const dispatch = useDispatch();
  const isPageNotFound = useSelector((state: ReduxState) => {
    return state.app.isPageNotFound;
  });

  const onSessionStarted = useCallback(() => {
    dispatch(sessionStarted());
  }, [dispatch]);

  const onManagePreviousRoute = useCallback(
    (props: ManagePreviousRouteOptions, onSuccess: () => void) => {
      dispatch(managePreviousRoute(props, onSuccess));
    },
    [dispatch],
  );

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

export default memo(RouteHandler);
