import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Header, Footer } from 'app/views';
import styles from './styles.scss';

const DefaultLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default memo(DefaultLayout);
