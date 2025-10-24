import React from 'react';
import { User, Transaction } from '../types';
import { FiArrowUpRight, FiArrowDownLeft, FiPlus, FiEye, FiEyeOff, FiBell, FiPlusCircle, FiRepeat, FiDownload, FiMaximize, FiCreditCard, FiFileText } from 'react-icons/fi';
import TransactionItem from './TransactionItem';

interface DashboardProps {
  user: User;
  balance: number;
  transactions: Transaction[];
  onSend: () => void;
  onReceive: () => void;
  onAddFunds: () => void;
  onViewAll: () => void;
}

const QuickActionButton: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void }> = ({ icon, label, onClick }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-2 text-chipper-gray-700 hover:text-primary-blue transition-colors">
    <div className="bg-chipper-gray-100 rounded-full p-4 group-hover:bg-primary-blue/10">
      {icon}
    </div>
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const ServiceButton: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; className: string; }> = ({ icon, label, onClick, className }) => (
    <button onClick={onClick} className="flex flex-col items-center gap-2 text-chipper-gray-700 hover:opacity-80 transition-opacity">
      <div className={`rounded-full p-4 ${className}`}>
          {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );

const Dashboard: React.FC<DashboardProps> = ({ user, balance, transactions, onSend, onReceive, onAddFunds, onViewAll }) => {
  const [isBalanceVisible, setIsBalanceVisible] = React.useState(true);

  const formattedBalance = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  }).format(balance);

  return (
    <div className="h-full bg-chipper-gray-50">
        <header className="bg-primary-blue text-white px-6 pt-6 pb-20 rounded-b-3xl">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <img src={user.avatarUrl} alt="User Avatar" className="w-12 h-12 rounded-full border-2 border-white/50" />
                    <div>
                        <p className="text-sm text-chipper-gray-300">Hello, {user.name.split(' ')[0]}</p>
                        <h1 className="text-xl font-bold">Welcome Back!</h1>
                    </div>
                </div>
                <button className="relative">
                    <FiBell size={24} />
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-primary-blue"></span>
                </button>
            </div>
            
            <div>
                 <div className="flex justify-between items-center">
                    <span className="text-sm text-chipper-gray-300">Your Balance</span>
                    <button onClick={() => setIsBalanceVisible(!isBalanceVisible)} className="text-chipper-gray-300 hover:text-white">
                        {isBalanceVisible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                </div>
                <div className="text-4xl font-bold tracking-tighter mt-1">
                    {isBalanceVisible ? formattedBalance : '∗∗∗∗∗∗∗∗∗'}
                </div>
            </div>
        </header>

        <div className="p-6">
            <div className="bg-white rounded-2xl shadow-md p-4 grid grid-cols-3 gap-4 text-center -mt-12">
                <QuickActionButton icon={<FiArrowUpRight size={24} />} label="Send" onClick={onSend}/>
                <QuickActionButton icon={<FiArrowDownLeft size={24} />} label="Receive" onClick={onReceive}/>
                <QuickActionButton icon={<FiPlus size={24} />} label="Add Funds" onClick={onAddFunds}/>
            </div>

            <div className="mt-8">
                <h2 className="text-lg font-bold text-chipper-gray-800 mb-4">Services</h2>
                <div className="grid grid-cols-3 gap-y-6 gap-x-4 text-center">
                    <ServiceButton icon={<FiPlusCircle size={24} />} label="Top Up" onClick={onAddFunds} className="bg-green-100 text-green-600" />
                    <ServiceButton icon={<FiRepeat size={24} />} label="Transfer" onClick={onSend} className="bg-purple-100 text-purple-600" />
                    <ServiceButton icon={<FiDownload size={24} />} label="Withdraw" onClick={() => alert('Withdraw clicked')} className="bg-red-100 text-red-600" />
                    <ServiceButton icon={<FiMaximize size={24} />} label="Scan" onClick={() => alert('Scan QR clicked')} className="bg-blue-100 text-blue-600" />
                    <ServiceButton icon={<FiCreditCard size={24} />} label="Pay" onClick={() => alert('Pay clicked')} className="bg-indigo-100 text-indigo-600" />
                    <ServiceButton icon={<FiFileText size={24} />} label="Bill" onClick={() => alert('Pay Bill clicked')} className="bg-yellow-100 text-yellow-600" />
                </div>
            </div>

            <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-chipper-gray-800">Recent Transactions</h2>
                    <button onClick={onViewAll} className="text-sm font-semibold text-primary-blue hover:text-primary-blue-dark">View All</button>
                </div>
                <div className="space-y-3">
                    {transactions.length > 0 ? transactions.map(tx => (
                        <TransactionItem key={tx.id} transaction={tx} />
                    )) : <p className="text-center text-chipper-gray-500 pt-4">No recent transactions.</p>}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Dashboard;