import React, { memo } from 'react';
import styles from './styles.scss';

const Header = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div>This is the header.</div>
      <img src="images/test_image.png" alt="test" />
    </div>
  );
};

export default memo(Header);
