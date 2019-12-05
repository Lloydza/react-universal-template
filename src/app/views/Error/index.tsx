import React, { memo } from 'react';
import styles from './styles.css';

interface ErrorComponentProps {
  retry?: () => void;
}

const ErrorComponent = ({ retry }: ErrorComponentProps): JSX.Element => (
  <div className={styles.container}>
    An error has occured.
    {retry && (
      <button type="button" onClick={retry}>
        retry
      </button>
    )}
  </div>
);

export default memo(ErrorComponent);
