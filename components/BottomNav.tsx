import React from 'react';
import { Page } from '../types';
import { FiHome, FiClock, FiSend, FiUser } from 'react-icons/fi';

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
      className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${
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
    { icon: <FiHome size={24} />, label: 'Home', page: Page.DASHBOARD },
    { icon: <FiClock size={24} />, label: 'History', page: Page.HISTORY },
    // A placeholder for spacing
    { icon: <div />, label: '', page: Page.PAY },
    { icon: <FiUser size={24} />, label: 'Settings', page: Page.SETTINGS },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-white">
        <div className="relative h-full flex justify-around items-center border-t border-chipper-gray-200 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)]">
            {navItems.map((item) => (
                item.page === Page.PAY ? <div key={item.page} className="w-1/4" /> :
                <NavItem
                    key={item.page}
                    {...item}
                    isActive={currentPage === item.page}
                    onClick={setCurrentPage}
                />
            ))}
             <div className="absolute left-1/2 -translate-x-1/2 -top-7">
                <button 
                    onClick={onSend}
                    className="bg-primary-blue text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-primary-blue-dark transition-transform transform hover:scale-105"
                >
                    <FiSend size={28} />
                </button>
            </div>
        </div>
    </div>
  );
};

export default BottomNav;
