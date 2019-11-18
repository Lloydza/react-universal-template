import React, { useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { manageChangeRoute } from 'app/store/actions';
import { AppLoadingWrapper } from 'app/wrappers';
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

interface DashboardPageContainerProps {
  currentRoute: string;
  onManageChangeRoute: (route: string) => void;
}

const DashboardPageContainer = (props: DashboardPageContainerProps): JSX.Element => {
  const { loading, error, data, refetch } = useQuery(MY_QUERY, {
    variables: {
      userId: 'befeOyRy4s86Br14btRxC5v7wH5dJBAlk89be',
    },
  });

  const retry = useCallback(() => {
    refetch();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error || !data || !data.user) {
    return <Error retry={retry} />;
  }

  return <DashboardPage user={data.user} {...props} />;
};

const mapStateToProps = (state: ReduxState): GenericObject => {
  return {
    currentRoute: state.history.currentRoute,
  };
};

const mapDispatchToProps = {
  onManageChangeRoute: manageChangeRoute,
};

export default AppLoadingWrapper(connect(mapStateToProps, mapDispatchToProps)(DashboardPageContainer));
