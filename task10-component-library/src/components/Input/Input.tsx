import React, { useId } from 'react';
import { InputProps } from './Input.types';
import './Input.css';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const describedBy = error
      ? errorId
      : helperText
      ? helperId
      : undefined;

    const wrapperClassNames = [
      'ds-input-wrapper',
      fullWidth ? 'ds-input-wrapper--full-width' : '',
      disabled ? 'ds-input-wrapper--disabled' : '',
      className
    ]
      .filter(Boolean)
      .join(' ');

    const containerClassNames = [
      'ds-input-container',
      error ? 'ds-input-container--error' : '',
      disabled ? 'ds-input-container--disabled' : ''
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClassNames}>
        {label && (
          <label htmlFor={inputId} className="ds-input-label">
            {label}
            {props.required && <span className="ds-input-required">*</span>}
          </label>
        )}

        <div className={containerClassNames}>
          {leftIcon && <span className="ds-input-icon ds-input-icon--left">{leftIcon}</span>}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className="ds-input-field"
            {...props}
          />
          {rightIcon && <span className="ds-input-icon ds-input-icon--right">{rightIcon}</span>}
        </div>

        {error && (
          <p id={errorId} className="ds-input-message ds-input-message--error" role="alert">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={helperId} className="ds-input-message ds-input-message--helper">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

