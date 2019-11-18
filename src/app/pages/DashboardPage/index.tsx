import React, { memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { manageChangeRoute } from 'app/store/actions';
import { Loader } from 'app/components';
import DashboardPage from './dashboardPage';

const DashboardPageContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentRoute = useSelector((state: ReduxState) => {
    return state.history.currentRoute;
  });

  const isAppLoading = useSelector((state: ReduxState) => {
    return state.app.isLoading;
  });

  const goToHomePage = useCallback(() => {
    return dispatch(manageChangeRoute('/'));
  }, [dispatch]);

  if (isAppLoading) {
    return <Loader />;
  }

  return <DashboardPage currentRoute={currentRoute} goToHomePage={goToHomePage} />;
};

export default memo(DashboardPageContainer);
