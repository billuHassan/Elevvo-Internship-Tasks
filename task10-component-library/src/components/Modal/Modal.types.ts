import React from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'full';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  size?: ModalSize;
  closeOnEsc?: boolean;
  closeOnBackdropClick?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

