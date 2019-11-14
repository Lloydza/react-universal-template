import React, { memo } from 'react';
import styles from './styles.scss';

const Footer = (): JSX.Element => {
  return <div className={styles.container}>This is the footer.</div>;
};

export default memo(Footer);
