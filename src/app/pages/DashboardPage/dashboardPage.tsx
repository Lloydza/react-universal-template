import React, { memo } from 'react';
import { Button } from 'app/components';
import styles from './styles.scss';

interface DashboardPageProps {
  currentRoute: string;
  goToHomePage: () => void;
}

const DashboardPage = ({ currentRoute, goToHomePage }: DashboardPageProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <div>This is the Dashboard Page</div>
      <div>
        <h3>{`Current route: ${currentRoute}`}</h3>
      </div>
      <Button text="Go to the home page." onClick={goToHomePage} />
    </div>
  );
};

export default memo(DashboardPage);
