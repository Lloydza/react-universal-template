import React, { memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { manageChangeRoute } from 'app/store/actions';
import NotFoundPage from './notFoundPage';

const NotFoundPageContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentRoute = useSelector((state: ReduxState) => {
    return state.history.currentRoute;
  });

  const goToHomePage = useCallback(() => {
    return dispatch(manageChangeRoute('/'));
  }, [dispatch]);

  return <NotFoundPage currentRoute={currentRoute} goToHomePage={goToHomePage} />;
};

export default memo(NotFoundPageContainer);
