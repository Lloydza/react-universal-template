import React, { useCallback, memo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button } from 'app/components';
import styles from './styles.scss';

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

interface DashboardPageProps {
  currentRoute: string;
  onManageChangeRoute: (route: string) => void;
}

const DashboardPage = ({ currentRoute, onManageChangeRoute }: DashboardPageProps): JSX.Element => {
  const { loading, error, data } = useQuery(MY_QUERY, {
    variables: {
      userId: 'befeOyRy4s86Br14btRxC5v7wH5dJBAlk89be',
    },
  });
  console.log('loading: ', loading);
  console.log('error: ', error);
  console.log('data: ', data);

  const handleGoToHomePage = useCallback((e: GenericObject) => {
    e.preventDefault();
    onManageChangeRoute('/');
  }, []);

  return (
    <div className={styles.container}>
      <div>This is the Dashboard Page</div>
      <div>
        <h3>{`Current route: ${currentRoute}`}</h3>
      </div>
      <Button text="Go to the home page." onClick={handleGoToHomePage} />
    </div>
  );
};

export default memo(DashboardPage);
