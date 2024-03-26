'use client';

import { useId } from 'react';
import ReactModal from 'react-modal';

import { cn } from '@/lib/utils';

import type { ModalProps } from './modal.d';

const Modal = ({
  isOpen,
  close,
  children,
  className,
  onAfterClose,
  shouldCloseOnOverlayClick = true,
}: ModalProps) => {
  const id = useId();

  return (
    <ReactModal
      isOpen={isOpen}
      closeTimeoutMS={300}
      style={{
        overlay: {
          backgroundColor: '#191B1F80',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'auto',
        },
        content: {
          outline: 'none',
        },
      }}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      shouldCloseOnEsc
      shouldReturnFocusAfterClose={true}
      ariaHideApp={false}
      onRequestClose={close}
      className={cn(
        'no-scrollbar max-h-[95%] overflow-y-auto overflow-x-hidden rounded-lg border-0 bg-white outline-none md:max-h-[calc(100vh-2rem)]',
        [className && className]
      )}
      portalClassName={id}
      bodyOpenClassName={`${id}_body_open`}
      htmlOpenClassName={`${id}_html_open`}
      onAfterClose={onAfterClose}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
