import React, { useState } from 'react';
import { X, ArrowRight, User, Stethoscope } from 'lucide-react';
import { Button } from '../Button';
import { Logo } from '../Logo';
import { UserRole } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (role: UserRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signup');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="flex justify-center mb-6">
            <Logo className="w-12 h-12 text-cliro-black" />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">
              {mode === 'signin' ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-gray-500 text-sm">
              {mode === 'signin' 
                ? 'Enter your credentials to access your dashboard.' 
                : 'Join the AI-native marketplace for healthcare education.'}
            </p>
          </div>

          {/* Role Selection (Simulated) */}
          <div className="space-y-4 mb-8">
            <button
              onClick={() => setSelectedRole(UserRole.STUDENT)}
              className={`w-full flex items-center p-4 rounded-xl border transition-all ${
                selectedRole === UserRole.STUDENT
                  ? 'border-cliro-black bg-gray-50 ring-1 ring-cliro-black'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className={`p-2 rounded-full mr-4 ${
                selectedRole === UserRole.STUDENT ? 'bg-cliro-black text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                <User className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-sm">I am a Student</div>
                <div className="text-xs text-gray-500">Looking for rotations & research</div>
              </div>
            </button>

            <button
              onClick={() => setSelectedRole(UserRole.PROFESSIONAL)}
              className={`w-full flex items-center p-4 rounded-xl border transition-all ${
                selectedRole === UserRole.PROFESSIONAL
                  ? 'border-cliro-black bg-gray-50 ring-1 ring-cliro-black'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className={`p-2 rounded-full mr-4 ${
                selectedRole === UserRole.PROFESSIONAL ? 'bg-cliro-black text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                <Stethoscope className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-sm">I am a Professional</div>
                <div className="text-xs text-gray-500">Offering learning experiences</div>
              </div>
            </button>
          </div>

          <Button 
            className="w-full" 
            disabled={!selectedRole}
            onClick={() => selectedRole && onLogin(selectedRole)}
          >
            {mode === 'signin' ? 'Log In' : 'Get Started'} <ArrowRight className="ml-2 w-4 h-4" />
          </Button>

          <div className="mt-6 text-center text-sm text-gray-500">
            {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => {
                setMode(mode === 'signin' ? 'signup' : 'signin');
                setSelectedRole(null);
              }}
              className="font-semibold text-cliro-black hover:underline"
            >
              {mode === 'signin' ? 'Sign up' : 'Log in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
