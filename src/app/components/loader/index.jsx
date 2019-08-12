import React, { memo } from 'react';
import styles from './styles.scss';

const Loader = () => {
  return <div className={styles.container}>Loading...</div>;
};

export default memo(Loader);
