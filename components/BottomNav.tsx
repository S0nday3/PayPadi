import React from 'react';
import { Page } from '../types';
import { FiHome, FiClock, FiSend, FiUser, FiCreditCard } from 'react-icons/fi';

interface BottomNavProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onSend: () => void;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  page: Page;
  isActive: boolean;
  onClick: (page: Page) => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, page, isActive, onClick }) => {
  return (
    <button
      onClick={() => onClick(page)}
      className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
        isActive ? 'text-primary-blue' : 'text-chipper-gray-400 hover:text-chipper-gray-600'
      }`}
    >
      {icon}
      <span className="text-xs font-medium mt-1">{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, setCurrentPage, onSend }) => {
  const navItems = [
    { icon: <FiClock size={24} />, label: 'History', page: Page.HISTORY },
    { icon: <FiHome size={24} />, label: 'Home', page: Page.DASHBOARD },
    // A placeholder for spacing for the send button
    { icon: <div />, label: '', page: Page.PAY },
    { icon: <FiCreditCard size={24} />, label: 'Cards', page: Page.CARDS },
    { icon: <FiUser size={24} />, label: 'Settings', page: Page.SETTINGS },
  ];

  const path = `M0,20 L151.5,20 A36,36 0 0,1 223.5,20 L375,20 L375,80 L0,80 Z`;

  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-transparent">
        <svg
            width="100%"
            height="80"
            viewBox="0 0 375 80"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 right-0 w-full"
            style={{ filter: 'drop-shadow(0 -5px 15px rgba(0,0,0,0.05))' }}
        >
            <path d={path} fill="white" />
        </svg>

        <div className="relative h-full grid grid-cols-5 items-center text-center">
            {navItems.map((item) => {
                 if (item.page === Page.PAY) {
                    return <div key={item.page} />; // Empty div for the middle grid cell
                }
                return <NavItem
                    key={item.page}
                    {...item}
                    isActive={currentPage === item.page}
                    onClick={setCurrentPage}
                />
            })}
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2 -top-7">
            <button 
                onClick={onSend}
                className="bg-primary-blue text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-primary-blue-dark transition-transform transform hover:scale-105 active:scale-95"
            >
                <FiSend size={28} />
            </button>
        </div>
    </div>
  );
};

export default BottomNav;