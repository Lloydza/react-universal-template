import React, { memo } from 'react';
import styles from './styles.css';

const Loader = (): JSX.Element => {
  return <div className={styles.container}>Loading...</div>;
};

export default memo(Loader);
