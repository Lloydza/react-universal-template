import React, { memo } from 'react';
import { Button } from 'app/components';
import styles from './styles.css';

interface NotFoundPageProps {
  currentRoute: string;
  goToHomePage: () => void;
}

const NotFoundPage = ({ currentRoute, goToHomePage }: NotFoundPageProps): JSX.Element => (
  <div className={styles.container}>
    <h1>Oops! We couldn&apos;t find the page you are looking for.</h1>
    <div>
      <h3>{`Current route: ${currentRoute}`}</h3>
    </div>
    <Button text="Go to the home page." onClick={goToHomePage} />
  </div>
);

export default memo(NotFoundPage);
