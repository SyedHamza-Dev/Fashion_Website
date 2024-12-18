import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center relative">
        <h2 className="text-2xl text-red-600 mb-4">{title}</h2>
        <p className="text-lg text-gray-800 mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition transform hover:scale-105"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition transform hover:scale-105"
            onClick={onClose}
          >
            {cancelText}
          </button>
        </div>
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
          onClick={onClose}
        >
          &times; {/* Close icon */}
        </button>
      </div>
    </div>
  );
};

export default Modal;
