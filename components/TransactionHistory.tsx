import React, { useState } from 'react';
import { Transaction } from '../types';
import TransactionItem from './TransactionItem';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const [filter, setFilter] = useState<'ALL' | 'SENT' | 'RECEIVED' | 'TOPUP'>('ALL');

  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'ALL') return true;
    return tx.type === filter;
  });

  const FilterButton: React.FC<{
    label: string;
    value: 'ALL' | 'SENT' | 'RECEIVED' | 'TOPUP';
  }> = ({ label, value }) => (
    <button
      onClick={() => setFilter(value)}
      className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
        filter === value
          ? 'bg-primary-blue text-white'
          : 'bg-chipper-gray-200 text-chipper-gray-700 hover:bg-chipper-gray-300'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-chipper-gray-800 mb-6 text-center">Transaction History</h1>
      <div className="flex justify-center space-x-2 mb-6">
        <FilterButton label="All" value="ALL" />
        <FilterButton label="Sent" value="SENT" />
        <FilterButton label="Received" value="RECEIVED" />
        <FilterButton label="Top-up" value="TOPUP" />
      </div>
      <div className="space-y-3">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map(tx => (
            <TransactionItem key={tx.id} transaction={tx} />
          ))
        ) : (
          <p className="text-center text-chipper-gray-500 mt-8">No transactions found for this filter.</p>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;