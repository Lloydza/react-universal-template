import React, { memo } from 'react';
import styles from './styles.scss';

const Footer = () => {
  return <div className={styles.container}>This is the footer.</div>;
};

export default memo(Footer);
