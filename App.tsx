import React, { useState } from 'react';
import { Page, Transaction } from './types';
import { MOCK_TRANSACTIONS, MOCK_USER } from './constants';
import Dashboard from './components/Dashboard';
import TransactionHistory from './components/TransactionHistory';
import Settings from './components/Settings';
import BottomNav from './components/BottomNav';
import AddFundsModal from './components/AddFundsModal';
import SendMoneyModal from './components/SendMoneyModal';
import ReceiveMoneyModal from './components/ReceiveMoneyModal';
import { createCharge, createTransfer, login, signUp } from './paypadi';
import AuthScreen from './components/auth/AuthScreen';
import KYCModal from './components/auth/KYCModal';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>(Page.DASHBOARD);
  const [balance, setBalance] = useState<number>(1250.75);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const user = MOCK_USER;

  const [isAddFundsOpen, setAddFundsOpen] = useState(false);
  const [isSendMoneyOpen, setSendMoneyOpen] = useState(false);
  const [isReceiveMoneyOpen, setReceiveMoneyOpen] = useState(false);
  const [isKycModalOpen, setIsKycModalOpen] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleLogin = async (email: string, pass: string) => {
    setIsLoading(true);
    setApiError(null);
    const response = await login(email, pass);
    if (response.success) {
      setIsAuthenticated(true);
    } else {
      alert(response.message);
    }
    setIsLoading(false);
  };
  
  const handleSignUp = async (fullName: string, email: string, pass: string) => {
    setIsLoading(true);
    setApiError(null);
    const response = await signUp(fullName, email, pass);
    if (response.success) {
      setIsAuthenticated(true); // Log the user in
      setIsKycModalOpen(true); // Open the KYC modal
    } else {
      alert(response.message);
    }
    setIsLoading(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage(Page.DASHBOARD);
  };

  const handleOpenModal = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setApiError(null);
    setter(true);
  };

  const handleAddFunds = async (amount: number) => {
    setIsLoading(true);
    setApiError(null);
    try {
      const response = await createCharge(amount);
      if (response.success) {
        setBalance(prev => prev + amount);
        const newTransaction: Transaction = {
          id: response.transactionId,
          type: 'TOPUP',
          amount: amount,
          currency: 'NGN',
          party: 'Card Deposit',
          date: new Date().toISOString(),
          description: 'Added funds via card',
        };
        setTransactions(prev => [newTransaction, ...prev]);
        setAddFundsOpen(false);
      } else {
        setApiError(response.message || 'Failed to add funds.');
      }
    } catch (error) {
      setApiError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMoney = async (recipient: string, amount: number, note: string) => {
     if (balance < amount) {
        setApiError('Insufficient balance.');
        return;
     }
     setIsLoading(true);
     setApiError(null);
     try {
        const response = await createTransfer(recipient, amount);
        if (response.success) {
            setBalance(prev => prev - amount);
            const newTransaction: Transaction = {
                id: response.transactionId,
                type: 'SENT',
                amount: amount,
                currency: 'NGN',
                party: recipient,
                date: new Date().toISOString(),
                description: note || `Sent to ${recipient}`,
            };
            setTransactions(prev => [newTransaction, ...prev]);
            setSendMoneyOpen(false);
        } else {
            setApiError(response.message || 'Failed to send money.');
        }
     } catch(error) {
        setApiError('An unexpected network error occurred.');
     } finally {
        setIsLoading(false);
     }
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.DASHBOARD:
        return (
          <Dashboard
            user={user}
            balance={balance}
            transactions={transactions.slice(0, 5)}
            onSend={() => handleOpenModal(setSendMoneyOpen)}
            onReceive={() => setReceiveMoneyOpen(true)}
            onAddFunds={() => handleOpenModal(setAddFundsOpen)}
            onViewAll={() => setCurrentPage(Page.HISTORY)}
          />
        );
      case Page.HISTORY:
        return <TransactionHistory transactions={transactions} />;
      case Page.SETTINGS:
        return <Settings user={user} onLogout={handleLogout} />;
      default:
        return <Dashboard 
            user={user}
            balance={balance}
            transactions={transactions.slice(0, 5)}
            onSend={() => handleOpenModal(setSendMoneyOpen)}
            onReceive={() => setReceiveMoneyOpen(true)}
            onAddFunds={() => handleOpenModal(setAddFundsOpen)}
            onViewAll={() => setCurrentPage(Page.HISTORY)}
        />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-chipper-gray-100 min-h-screen font-sans flex items-center justify-center">
          <AuthScreen onLogin={handleLogin} onSignUp={handleSignUp} isLoading={isLoading} />
      </div>
    );
  }

  return (
    <div className="bg-chipper-gray-100 min-h-screen font-sans flex items-center justify-center">
      <div className="relative w-full max-w-sm h-[800px] max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <main className="flex-1 overflow-y-auto pb-20 bg-chipper-gray-50">
            {renderPage()}
        </main>
        <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} onSend={() => handleOpenModal(setSendMoneyOpen)} />

        {isAddFundsOpen && <AddFundsModal 
            onClose={() => setAddFundsOpen(false)} 
            onAddFunds={handleAddFunds}
            isLoading={isLoading}
            error={apiError} 
        />}
        {isSendMoneyOpen && <SendMoneyModal 
            currentBalance={balance} 
            onClose={() => setSendMoneyOpen(false)} 
            onSendMoney={handleSendMoney}
            isLoading={isLoading}
            error={apiError}
        />}
        {isReceiveMoneyOpen && <ReceiveMoneyModal user={user} onClose={() => setReceiveMoneyOpen(false)} />}
        {isKycModalOpen && <KYCModal 
          onClose={() => setIsKycModalOpen(false)} 
          onVerify={() => {
            alert("Redirecting to verification flow...");
            setIsKycModalOpen(false);
          }} 
        />}
      </div>
    </div>
  );
}