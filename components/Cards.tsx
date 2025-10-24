import React from 'react';
import { FiCreditCard } from 'react-icons/fi';

const Cards: React.FC = () => {
  return (
    <div className="p-6 h-full flex flex-col items-center justify-center text-center bg-chipper-gray-50">
      <div className="p-4 bg-primary-blue/10 rounded-full mb-4">
        <FiCreditCard size={32} className="text-primary-blue" />
      </div>
      <h1 className="text-2xl font-bold text-chipper-gray-800 mb-2">My Cards</h1>
      <p className="text-chipper-gray-500 max-w-xs">
        Manage your linked payment cards here. This feature is coming soon!
      </p>
    </div>
  );
};

export default Cards;