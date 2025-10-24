import React, { useState } from 'react';
import Modal from './common/Modal';
import { FiLoader, FiCreditCard, FiSmartphone, FiBriefcase } from 'react-icons/fi';
import ApiErrorMessage from './common/ApiErrorMessage';

interface AddFundsModalProps {
  onClose: () => void;
  onAddFunds: (amount: number) => void;
  isLoading: boolean;
  error: string | null;
}

type PaymentMethod = 'card' | 'ussd' | 'bank';

const TabButton: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className={`flex-1 flex flex-col items-center justify-center p-3 border-b-2 transition-all duration-300 ${
            isActive
                ? 'border-primary-blue text-primary-blue'
                : 'border-transparent text-chipper-gray-500 hover:bg-chipper-gray-50'
        }`}
    >
        {icon}
        <span className="text-xs font-semibold mt-1">{label}</span>
    </button>
);

const CardForm = () => (
    <div className="space-y-4 mt-4">
        <div>
            <label className="text-xs font-medium text-chipper-gray-600">Card Number</label>
            <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-3 border rounded-md mt-1 focus:ring-primary-blue focus:border-primary-blue" />
        </div>
        <div className="flex gap-4">
            <div className="flex-1">
                 <label className="text-xs font-medium text-chipper-gray-600">Expiry Date</label>
                 <input type="text" placeholder="MM / YY" className="w-full p-3 border rounded-md mt-1 focus:ring-primary-blue focus:border-primary-blue" />
            </div>
            <div className="flex-1">
                 <label className="text-xs font-medium text-chipper-gray-600">CVV</label>
                 <input type="text" placeholder="123" className="w-full p-3 border rounded-md mt-1 focus:ring-primary-blue focus:border-primary-blue" />
            </div>
        </div>
    </div>
);

const UssdInfo = () => (
    <div className="mt-4 p-4 bg-chipper-gray-100 rounded-lg text-center">
        <p className="text-sm text-chipper-gray-700">To pay with USSD, please dial the code below on your mobile phone:</p>
        <p className="text-lg font-bold text-chipper-gray-800 my-2 tracking-wider">*123*000*1234#</p>
        <p className="text-xs text-chipper-gray-500">This is a sample code for demonstration.</p>
    </div>
);

const BankTransferInfo = () => (
     <div className="mt-4 p-4 bg-chipper-gray-100 rounded-lg space-y-2">
        <p className="text-sm text-chipper-gray-700 font-semibold text-center mb-3">Transfer the exact amount to:</p>
        <div>
            <span className="text-xs text-chipper-gray-500">Bank Name</span>
            <p className="font-bold text-chipper-gray-800">PayPadi Bank</p>
        </div>
         <div>
            <span className="text-xs text-chipper-gray-500">Account Number</span>
            <p className="font-bold text-chipper-gray-800">1234567890</p>
        </div>
         <div>
            <span className="text-xs text-chipper-gray-500">Beneficiary</span>
            <p className="font-bold text-chipper-gray-800">Chipper Wallet Top-up</p>
        </div>
    </div>
)

const AddFundsModal: React.FC<AddFundsModalProps> = ({ onClose, onAddFunds, isLoading, error }) => {
  const [amount, setAmount] = useState('');
  const [activeTab, setActiveTab] = useState<PaymentMethod>('card');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount) && numericAmount > 0) {
      onAddFunds(numericAmount);
    }
  };
  
  const renderContent = () => {
      switch(activeTab) {
          case 'card': return <CardForm />;
          case 'ussd': return <UssdInfo />;
          case 'bank': return <BankTransferInfo />;
          default: return <CardForm />;
      }
  }

  return (
    <Modal title="Secure Top-up via PayPadi" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-chipper-gray-700 mb-1">
            Amount (NGN)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g., 5000"
            className="w-full px-4 py-3 border border-chipper-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue transition"
            autoFocus
          />
        </div>
        
        <div>
            <div className="text-sm font-medium text-chipper-gray-700 mb-2">Choose payment method</div>
            <div className="flex border-b border-chipper-gray-200">
                <TabButton icon={<FiCreditCard size={20}/>} label="Card" isActive={activeTab === 'card'} onClick={() => setActiveTab('card')} />
                <TabButton icon={<FiSmartphone size={20}/>} label="USSD" isActive={activeTab === 'ussd'} onClick={() => setActiveTab('ussd')} />
                <TabButton icon={<FiBriefcase size={20}/>} label="Bank" isActive={activeTab === 'bank'} onClick={() => setActiveTab('bank')} />
            </div>
            {renderContent()}
        </div>

        <ApiErrorMessage message={error} />
        
        <button
          type="submit"
          disabled={!amount || parseFloat(amount) <= 0 || isLoading}
          className="w-full bg-primary-blue text-white font-bold py-3 rounded-lg hover:bg-primary-blue-dark transition-colors disabled:bg-chipper-gray-300 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {isLoading ? <FiLoader className="animate-spin" size={24} /> : `Pay NGN ${parseFloat(amount) > 0 ? parseFloat(amount).toLocaleString() : ''}`}
        </button>
      </form>
    </Modal>
  );
};

export default AddFundsModal;