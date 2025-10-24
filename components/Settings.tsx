import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { FiUser, FiBell, FiShield, FiHelpCircle, FiLogOut, FiChevronRight, FiLock } from 'react-icons/fi';
import ToggleSwitch from './common/ToggleSwitch';

interface SettingsProps {
  user: User;
  onLogout: () => void;
}

const SettingsItem: React.FC<{ icon: React.ReactNode; label: string; onClick?: () => void }> = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="w-full flex items-center p-4 bg-white rounded-lg shadow-sm hover:bg-chipper-gray-50 transition-colors">
        <div className="text-primary-blue mr-4">
            {icon}
        </div>
        <span className="flex-1 text-left font-medium text-chipper-gray-700">{label}</span>
        <FiChevronRight className="text-chipper-gray-400" />
    </button>
);

const Settings: React.FC<SettingsProps> = ({ user, onLogout }) => {
  const [isBiometricsEnabled, setIsBiometricsEnabled] = useState(false);

  useEffect(() => {
    const checkBiometricStatus = async () => {
      // @ts-ignore - aistudio object is injected
      if (window.aistudio?.user?.isBiometricsEnabled) {
        try {
          // @ts-ignore
          const enabled = await window.aistudio.user.isBiometricsEnabled();
          setIsBiometricsEnabled(enabled);
        } catch (error) {
          console.error("Could not check biometric status:", error);
        }
      }
    };
    checkBiometricStatus();
  }, []);

  const handleBiometricsToggle = async () => {
    if (!isBiometricsEnabled) {
      // @ts-ignore - aistudio object is injected
      if (window.aistudio?.user?.requestBiometrics) {
        try {
          // @ts-ignore
          const success = await window.aistudio.user.requestBiometrics();
          setIsBiometricsEnabled(success);
          if (!success) {
            alert('Biometric authentication could not be enabled.');
          }
        } catch (error) {
           console.error('Error requesting biometrics:', error);
           alert('An error occurred while setting up biometric authentication.');
        }
      }
    } else {
      // In a real app, you might need an API call to deregister biometrics.
      // For this simulation, we'll just toggle the state.
      setIsBiometricsEnabled(false);
    }
  };


  return (
    <div className="p-6 bg-chipper-gray-50 min-h-full">
      <h1 className="text-2xl font-bold text-chipper-gray-800 mb-6 text-center">Settings</h1>
      
      <div className="flex flex-col items-center mb-8">
        <img src={user.avatarUrl} alt="User Avatar" className="w-24 h-24 rounded-full border-4 border-primary-blue mb-4" />
        <h2 className="text-xl font-bold text-chipper-gray-800">{user.name}</h2>
        <p className="text-chipper-gray-500">{user.username}</p>
      </div>

      <div className="space-y-3">
        <SettingsItem icon={<FiUser size={20} />} label="Profile" />
        <SettingsItem icon={<FiBell size={20} />} label="Notifications" />
        <SettingsItem icon={<FiShield size={20} />} label="Security" />
         <div className="w-full flex items-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-primary-blue mr-4">
                <FiLock size={20} />
            </div>
            <span className="flex-1 text-left font-medium text-chipper-gray-700">Biometric Authentication</span>
            <ToggleSwitch isOn={isBiometricsEnabled} onToggle={handleBiometricsToggle} />
        </div>
        <SettingsItem icon={<FiHelpCircle size={20} />} label="Help & Support" />
        <div className="pt-4">
            <SettingsItem icon={<FiLogOut size={20} />} label="Log Out" onClick={onLogout} />
        </div>
      </div>
    </div>
  );
};

export default Settings;