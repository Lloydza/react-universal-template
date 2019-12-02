import React, { memo } from 'react';
import { Button } from 'app/components';
import styles from './styles.css';

interface DashboardPageProps {
  user: {
    userId: string;
    firstName: string;
    lastName: string;
    username: string;
    messages: {
      messageId: string;
      text: string;
    };
  };
  currentRoute: string;
  goToHomePage: () => void;
}

const DashboardPage = ({ user, currentRoute, goToHomePage }: DashboardPageProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <div>This is the Dashboard Page</div>
      <div>
        <h3>{`Current route: ${currentRoute}`}</h3>
      </div>
      <div>
        <h3>Data is:</h3>
        {JSON.stringify(user)}
      </div>
      <Button text="Go to the home page." onClick={goToHomePage} />
    </div>
  );
};

export default memo(DashboardPage);
