import React, { memo } from 'react';
import { Header, Footer } from 'app/views';
import styles from './styles.scss';

const DefaultLayout = ({ children }: { children: JSX.Element }): JSX.Element => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
};

export default memo(DefaultLayout);
