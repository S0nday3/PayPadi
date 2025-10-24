import React, { useState } from 'react';
import { FiLock, FiMail, FiUser, FiEye, FiEyeOff, FiLoader } from 'react-icons/fi';

interface AuthScreenProps {
  onLogin: (email: string, pass: string) => void;
  onSignUp: (fullName: string, email: string, pass: string) => void;
  isLoading: boolean;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, onSignUp, isLoading }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(email, password);
    } else {
      onSignUp(fullName, email, password);
    }
  }

  return (
    <div className="w-full max-w-sm h-[800px] max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col p-8 justify-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-chipper-gray-800">{isLogin ? 'Welcome Back!' : 'Create Account'}</h1>
        <p className="text-chipper-gray-500 mt-2">{isLogin ? 'Sign in to continue' : 'Join us today!'}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-chipper-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-chipper-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue"
              required={!isLogin}
            />
          </div>
        )}
        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-chipper-gray-400" />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-chipper-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue"
            required
          />
        </div>
        <div className="relative">
          <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-chipper-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-10 py-3 border border-chipper-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-chipper-gray-400 hover:text-chipper-gray-600"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {isLogin && (
            <div className="text-right">
                <a href="#" className="text-sm font-medium text-primary-blue hover:underline">Forgot Password?</a>
            </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary-blue text-white font-bold py-3 rounded-lg hover:bg-primary-blue-dark transition-colors mt-2 disabled:bg-chipper-gray-300 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {isLoading ? <FiLoader className="animate-spin" size={24} /> : (isLogin ? 'Sign In' : 'Create Account')}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-chipper-gray-500">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-primary-blue hover:underline ml-1">
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;