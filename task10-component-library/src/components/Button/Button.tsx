import React from 'react';
import { ButtonProps } from './Button.types';
import './Button.css';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const classNames = [
      'ds-button',
      `ds-button--${variant}`,
      `ds-button--${size}`,
      fullWidth ? 'ds-button--full-width' : '',
      isLoading ? 'ds-button--loading' : '',
      className
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type={props.type || 'button'}
        className={classNames}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading && (
          <span className="ds-button__spinner" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle
                cx="12"
                cy="12"
                r="10"
                strokeWidth="3"
                strokeDasharray="31.4 31.4"
              />
            </svg>
          </span>
        )}
        {!isLoading && leftIcon && (
          <span className="ds-button__icon ds-button__icon--left">{leftIcon}</span>
        )}
        <span className="ds-button__content">{children}</span>
        {!isLoading && rightIcon && (
          <span className="ds-button__icon ds-button__icon--right">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

