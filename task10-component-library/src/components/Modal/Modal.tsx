import React, { useEffect, useId } from 'react';
import { ModalProps } from './Modal.types';
import './Modal.css';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  size = 'md',
  closeOnEsc = true,
  closeOnBackdropClick = true,
  children,
  footer
}) => {
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  // Lock background body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="ds-modal-overlay"
      onClick={handleBackdropClick}
      data-testid="modal-backdrop"
      role="presentation"
    >
      <div
        className={`ds-modal-content ds-modal-content--${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
      >
        <header className="ds-modal-header">
          <div className="ds-modal-titles">
            {title && (
              <h2 id={titleId} className="ds-modal-title">
                {title}
              </h2>
            )}
            {description && (
              <p id={descId} className="ds-modal-description">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            className="ds-modal-close"
            onClick={onClose}
            aria-label="Close dialog"
            title="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>

        <div className="ds-modal-body">{children}</div>

        {footer && <footer className="ds-modal-footer">{footer}</footer>}
      </div>
    </div>
  );
};

