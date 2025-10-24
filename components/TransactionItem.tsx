import React from 'react';
import { Transaction, TransactionType } from '../types';
import { FiArrowUpRight, FiArrowDownLeft, FiPlusCircle } from 'react-icons/fi';

interface TransactionItemProps {
  transaction: Transaction;
}

const ICONS: Record<TransactionType, React.ReactNode> = {
  SENT: <FiArrowUpRight className="text-red-500" />,
  RECEIVED: <FiArrowDownLeft className="text-green-500" />,
  TOPUP: <FiPlusCircle className="text-blue-500" />,
};

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const { type, party, date, amount, currency } = transaction;

  const formattedAmount = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currency,
  }).format(amount);

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  
  const sign = type === 'SENT' ? '-' : '+';
  const amountColor = type === 'SENT' ? 'text-red-500' : 'text-green-500';

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center space-x-4">
      <div className="bg-chipper-gray-100 p-3 rounded-full">
        {ICONS[type]}
      </div>
      <div className="flex-1">
        <p className="font-bold text-chipper-gray-800">{party}</p>
        <p className="text-sm text-chipper-gray-500">{formattedDate}</p>
      </div>
      <div className={`font-bold ${amountColor}`}>
        {sign}{formattedAmount}
      </div>
    </div>
  );
};

export default TransactionItem;