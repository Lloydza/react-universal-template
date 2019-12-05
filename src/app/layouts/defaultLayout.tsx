import React, { memo } from 'react';
import { Header, Footer } from 'app/views';
import styles from './styles.css';

const DefaultLayout = ({ children }: { children: JSX.Element }): JSX.Element => (
  <div className={styles.container}>
    <Header />
    <div className={styles.content}>{children}</div>
    <Footer />
  </div>
);

export default memo(DefaultLayout);
