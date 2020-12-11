import { ReactNode, Fragment } from 'react';

function Modal({ isOpen, handleClose, children }: ModalProps): JSX.Element {
  return (
    <Fragment>
      <div className={isOpen ? 'block' : 'hidden'}>
        <div
          className={`fixed top-0 left-0 bottom-0 w-full bg-gray-300 bg-opacity-40 z-20 transition duration-200 ease-in-out ${
            isOpen ? 'block' : 'hidden'
          }`}
          onClick={handleClose}
        ></div>
        <div className='fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-30 w-full px-4'>
          <div className='bg-gray-800 rounded-lg p-6 mx-auto max-w-md w-full shadow-lg space-y-4'>
            {children}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  children: ReactNode;
}

export default Modal;
