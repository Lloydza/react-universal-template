import React, { memo } from 'react';
import styles from './styles.scss';

interface ButtonProps {
  size?: string;
  text?: string;
  onClick?: ClickFunction;
  className?: string;
  disabled?: boolean;
}

const Button = ({ size, text, onClick, className, disabled }: ButtonProps): JSX.Element => {
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

Button.defaultProps = {
  size: 'medium',
  text: null,
  onClick: (): void => {},
  className: '',
  disabled: false,
};

export default memo(Button);
