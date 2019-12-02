import React, { memo } from 'react';
import { Button } from 'app/components';
import styles from './styles.css';

interface HomePageProps {
  currentRoute: string;
  goToDashboardPage: () => void;
}

const HomePage = ({ currentRoute, goToDashboardPage }: HomePageProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <div>This is the Home Page</div>
      <div>
        <h3>{`Current route: ${currentRoute}`}</h3>
      </div>
      <Button text="Go to the dashboard page." onClick={goToDashboardPage} />
    </div>
  );
};

export default memo(HomePage);
