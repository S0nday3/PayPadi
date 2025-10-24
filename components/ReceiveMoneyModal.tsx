import React from 'react';
import Modal from './common/Modal';
import { User } from '../types';

interface ReceiveMoneyModalProps {
  user: User;
  onClose: () => void;
}

const ReceiveMoneyModal: React.FC<ReceiveMoneyModalProps> = ({ user, onClose }) => {
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(user.username)}`;
  
  return (
    <Modal title="Receive Money" onClose={onClose}>
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 bg-white border rounded-lg">
          <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
        </div>
        <p className="text-chipper-gray-600">Scan this QR code to pay me</p>
        <div className="text-center">
            <p className="font-bold text-lg text-chipper-gray-800">{user.name}</p>
            <p className="text-chipper-gray-500 text-lg">{user.username}</p>
        </div>
        <button 
          onClick={onClose}
          className="w-full bg-primary-blue text-white font-bold py-3 rounded-lg hover:bg-primary-blue-dark transition-colors mt-4"
        >
          Done
        </button>
      </div>
    </Modal>
  );
};

export default ReceiveMoneyModal;
