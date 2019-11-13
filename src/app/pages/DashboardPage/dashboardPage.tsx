import React, { useCallback, memo } from 'react';
import { Button } from 'app/components';
import styles from './styles.scss';

interface DashboardPageProps {
  currentRoute: string;
  manageChangeRoute: (route: string) => void;
}

const DashboardPage = ({ currentRoute, manageChangeRoute }: DashboardPageProps): JSX.Element => {
  const handleGoToHomePage = useCallback((e: GenericObject) => {
    e.preventDefault();
    manageChangeRoute('/');
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
