import { createPortal } from 'react-dom';
import { ModalContent, ModalWrapper } from './Modal.styled';

export const Modal = ({ children }) => {
  return createPortal(
    <ModalWrapper>
      <ModalContent>{children}</ModalContent>
    </ModalWrapper>,
    document.getElementById('portal')
  );
};
