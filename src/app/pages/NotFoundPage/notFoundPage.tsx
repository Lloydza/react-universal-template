import React, { useCallback, memo } from 'react';
import { Button } from 'app/components';
import styles from './styles.scss';

interface NotFoundPageProps {
  currentRoute: string;
  onManageChangeRoute: (route: string) => void;
}

const NotFoundPage = ({ currentRoute, onManageChangeRoute }: NotFoundPageProps): JSX.Element => {
  const handleGoToHomePage = useCallback((e: GenericObject) => {
    e.preventDefault();
    onManageChangeRoute('/');
  }, []);

  return (
    <div className={styles.container}>
      <h1>Oops! We couldn&apos;t find the page you are looking for.</h1>
      <div>
        <h3>{`Current route: ${currentRoute}`}</h3>
      </div>
      <Button text="Go to the home page." onClick={handleGoToHomePage} />
    </div>
  );
};

export default memo(NotFoundPage);
