'use client';

import { useState } from 'react';
import { Mail, Lock, User as UserIcon } from 'lucide-react';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

// InputField component with dark theme
const InputField = ({ icon, type, placeholder }: { icon: React.ReactNode, type: string, placeholder: string }) => (
  <div className="relative flex items-center mb-4">
    <span className="absolute left-3 text-gray-400">{icon}</span>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full pl-10 pr-3 py-3 bg-[#2D2E35] border border-gray-700 rounded-lg text-white placeholder:text-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
      required
    />
  </div>
);

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] z-50 p-4">
        <div className="w-full">
          {/* Close button */}
          <div className="flex justify-end mb-2">
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-white rounded-full transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div className="bg-[#202123] rounded-xl shadow-xl border border-gray-700">
            {/* Modal Header */}
            <div className="px-6 py-8 text-center border-b border-gray-700">
              <h1 className="text-2xl font-semibold text-white mb-2">
                {isSignUp ? 'Sign up' : 'Log in or sign up'}
              </h1>
              <p className="text-sm text-gray-400">
                You&apos;ll get smarter legal responses and can upload files, images, and more.
              </p>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Social Login Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    toast.promise(
                      signIn('google', { callbackUrl: window.location.pathname }),
                      {
                        loading: 'Connecting to Google...',
                        success: 'Signed in successfully!',
                        error: 'Could not sign in with Google'
                      }
                    );
                  }}
                  className="w-full flex items-center justify-center gap-3 bg-[#2D2E35] text-white font-medium py-3 px-4 rounded-lg hover:bg-[#3E3F48] border border-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </button>

                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 bg-[#2D2E35] text-white font-medium py-3 px-4 rounded-lg hover:bg-[#3E3F48] border border-gray-700 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.5 0h-9.5v9.5h9.5v-9.5z"></path>
                    <path d="M20 0h-9.5v9.5h9.5v-9.5z"></path>
                    <path d="M9.5 10.5h-9.5v9.5h9.5v-9.5z"></path>
                    <path d="M20 10.5h-9.5v9.5h9.5v-9.5z"></path>
                  </svg>
                  Continue with Microsoft
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#202123] text-gray-400">OR</span>
                </div>
              </div>

              {/* Email Form */}
              <form className="space-y-4">
                {isSignUp && (
                  <InputField icon={<UserIcon size={20} />} type="text" placeholder="Full Name" />
                )}
                <InputField icon={<Mail size={20} />} type="email" placeholder="Email address" />
                <InputField icon={<Lock size={20} />} type="password" placeholder="Password" />
                
                <button
                  type="submit"
                  className="w-full bg-white hover:bg-gray-100 text-black font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                >
                  Continue with email
                </button>
              </form>

              {/* Toggle Sign Up/Sign In */}
              <p className="text-center text-gray-400 text-sm">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-white hover:underline focus:outline-none"
                >
                  {isSignUp ? 'Sign in' : 'Sign up'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}