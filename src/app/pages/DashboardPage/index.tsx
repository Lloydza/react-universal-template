import React, { memo, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useSelector, useDispatch } from 'react-redux';
import { manageChangeRoute } from 'app/store/actions';
import { Loader } from 'app/components';
import { Error } from 'app/views';
import DashboardPage from './dashboardPage';

const MY_QUERY = gql`
  query GetUser($userId: ID!) {
    user(userId: $userId) {
      userId
      firstName
      lastName
      username
      messages {
        messageId
        text
      }
    }
  }
`;

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

  const { loading, error, data, refetch } = useQuery(MY_QUERY, {
    variables: {
      userId: 'befeOyRy4s86Br14btRxC5v7wH5dJBAlk89be',
    },
  });

  const retry = useCallback(() => {
    refetch();
  }, []);

  if (isAppLoading || loading) {
    return <Loader />;
  }

  if (error || !data || !data.user) {
    return <Error retry={retry} />;
  }

  return <DashboardPage user={data.user} currentRoute={currentRoute} goToHomePage={goToHomePage} />;
};

export default memo(DashboardPageContainer);
