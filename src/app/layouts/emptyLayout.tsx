import React, { memo } from 'react';
import styles from './styles.css';

const EmptyLayout = ({ children }: { children: JSX.Element }): JSX.Element => (
  <div className={styles.container}>{children}</div>
);

export default memo(EmptyLayout);
