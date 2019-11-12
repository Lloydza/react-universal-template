import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const EmptyLayout = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

EmptyLayout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default memo(EmptyLayout);
