export type ModalProps = {
  isOpen: boolean;
  close: () => void;
  children?: React.ReactNode;
  className?: string;
  onAfterClose?: () => void;
  shouldCloseOnOverlayClick?: boolean;
};
