import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <button onClick={onClose} className="float-right text-gray-500 hover:text-gray-700">&times;</button>
        <div className="clear-both">{children}</div>
      </div>
    </div>
  );
};

export default Modal;