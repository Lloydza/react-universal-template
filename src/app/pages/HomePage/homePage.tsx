import React, { useCallback, memo } from 'react';
import { Button } from 'app/components';
import styles from './styles.scss';

interface HomePageProps {
  currentRoute: string;
  onManageChangeRoute: (route: string) => void;
}

const HomePage = ({ currentRoute, onManageChangeRoute }: HomePageProps): JSX.Element => {
  const handleGoToDashboardPage = useCallback((e: GenericObject) => {
    e.preventDefault();
    onManageChangeRoute('/dashboard');
  }, []);

  return (
    <div className={styles.container}>
      <div>This is the Home Page</div>
      <div>
        <h3>{`Current route: ${currentRoute}`}</h3>
      </div>
      <Button text="Go to the dashboard page." onClick={handleGoToDashboardPage} />
    </div>
  );
};

export default memo(HomePage);
