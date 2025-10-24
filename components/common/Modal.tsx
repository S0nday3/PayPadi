import React, { PropsWithChildren } from 'react';
import { FiX } from 'react-icons/fi';

interface ModalProps extends PropsWithChildren {
  title: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-sm rounded-t-3xl shadow-lg p-6 relative animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-chipper-gray-800">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-chipper-gray-400 hover:text-chipper-gray-600 p-2 rounded-full bg-chipper-gray-100 hover:bg-chipper-gray-200"
          >
            <FiX size={20} />
          </button>
        </div>
        <div>{children}</div>
      </div>
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Modal;
