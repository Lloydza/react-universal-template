import React, { memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { manageChangeRoute } from 'app/store/actions';
import { Loader } from 'app/components';
import HomePage from './homePage';

const HomePageContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentRoute = useSelector((state: ReduxState) => {
    return state.history.currentRoute;
  });

  const isAppLoading = useSelector((state: ReduxState) => {
    return state.app.isLoading;
  });

  const goToDashboardPage = useCallback(() => {
    return dispatch(manageChangeRoute('/dashboard'));
  }, [dispatch]);

  if (isAppLoading) {
    return <Loader />;
  }

  return <HomePage currentRoute={currentRoute} goToDashboardPage={goToDashboardPage} />;
};

export default memo(HomePageContainer);
