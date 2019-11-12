import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Button = ({ size, text, onClick, className, disabled }) => {
  return (
    <button
      type="submit"
      className={`
        ${className}
        ${styles.button}
        ${styles[size]}
        ${disabled ? styles.disabled : ''}
      `}
      onClick={disabled ? null : onClick}
      tabIndex={0}
      onKeyPress={disabled ? null : onClick}
      disabled={disabled}
    >
      {text && <p>{text}</p>}
    </button>
  );
};

Button.propTypes = {
  size: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  size: 'medium',
  text: null,
  onClick: () => {},
  className: '',
  disabled: false,
};

export default memo(Button);
