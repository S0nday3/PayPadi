import React from 'react';
import Modal from '../common/Modal';
import { FiShield } from 'react-icons/fi';

interface KYCModalProps {
  onClose: () => void;
  onVerify: () => void;
}

const KYCModal: React.FC<KYCModalProps> = ({ onClose, onVerify }) => {
  return (
    <Modal title="Verify Your Identity" onClose={onClose}>
      <div className="flex flex-col items-center text-center gap-4">
        <div className="p-4 bg-primary-blue/10 rounded-full">
            <FiShield size={32} className="text-primary-blue" />
        </div>

        <p className="text-chipper-gray-600">
          To keep your account secure and unlock all features, we need to verify your identity. This is a quick one-time process.
        </p>
        
        <div className="w-full flex flex-col gap-3 mt-4">
            <button 
              onClick={onVerify}
              className="w-full bg-primary-blue text-white font-bold py-3 rounded-lg hover:bg-primary-blue-dark transition-colors"
            >
              Verify Now
            </button>
            <button 
              onClick={onClose}
              className="w-full text-chipper-gray-600 font-bold py-3 rounded-lg hover:bg-chipper-gray-100 transition-colors"
            >
              I'll do it later
            </button>
        </div>
      </div>
    </Modal>
  );
};

export default KYCModal;