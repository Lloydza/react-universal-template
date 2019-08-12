import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Footer, Header } from 'app/components';
import styles from './styles.scss';

const DefaultLayout = (props) => {
  const { children } = props;

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
