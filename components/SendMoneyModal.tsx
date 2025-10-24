import React, { useState } from 'react';
import Modal from './common/Modal';
import { FiLoader } from 'react-icons/fi';
import ApiErrorMessage from './common/ApiErrorMessage';

interface SendMoneyModalProps {
  currentBalance: number;
  onClose: () => void;
  onSendMoney: (recipient: string, amount: number, note: string) => void;
  isLoading: boolean;
  error: string | null;
}

const SendMoneyModal: React.FC<SendMoneyModalProps> = ({ currentBalance, onClose, onSendMoney, isLoading, error }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [clientError, setClientError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setClientError('');
    const numericAmount = parseFloat(amount);
    
    if (isNaN(numericAmount) || numericAmount <= 0) {
        setClientError('Please enter a valid amount.');
        return;
    }
    if (numericAmount > currentBalance) {
        setClientError('Insufficient balance.');
        return;
    }

    onSendMoney(recipient, numericAmount, note);
  };

  return (
    <Modal title="Send Money" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="recipient" className="block text-sm font-medium text-chipper-gray-700 mb-1">
            Recipient's @username
          </label>
          <input
            type="text"
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="@username"
            className="w-full px-4 py-3 border border-chipper-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue transition"
            autoFocus
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-chipper-gray-700 mb-1">
            Amount (NGN)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 border border-chipper-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue transition"
          />
        </div>
         <div>
          <label htmlFor="note" className="block text-sm font-medium text-chipper-gray-700 mb-1">
            Note (Optional)
          </label>
          <input
            type="text"
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g., For lunch"
            className="w-full px-4 py-3 border border-chipper-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue transition"
          />
        </div>

        {clientError && <p className="text-red-500 text-sm text-center -mt-2 mb-2">{clientError}</p>}
        <ApiErrorMessage message={error} />
        
        <button
          type="submit"
          disabled={!recipient || !amount || parseFloat(amount) <= 0 || isLoading}
          className="w-full bg-primary-blue text-white font-bold py-3 rounded-lg hover:bg-primary-blue-dark transition-colors mt-2 disabled:bg-chipper-gray-300 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {isLoading ? <FiLoader className="animate-spin" size={24} /> : 'Send'}
        </button>
      </form>
    </Modal>
  );
};

export default SendMoneyModal;