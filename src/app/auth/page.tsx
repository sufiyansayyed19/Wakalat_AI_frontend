'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User as UserIcon } from 'lucide-react';

// --- CORRECTED CODE ---
// InputField is now defined OUTSIDE the AuthPage component.
const InputField = ({ icon, type, placeholder }: { icon: React.ReactNode, type: string, placeholder: string }) => (
  <div className="relative flex items-center mb-4">
    <span className="absolute left-3 text-stone-400">{icon}</span>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full pl-10 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-md placeholder:text-stone-400 focus:ring-1 focus:ring-amber-700 focus:border-amber-700 focus:outline-none transition"
      required
    />
  </div>
);


export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-stone-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-stone-800 hover:text-stone-900 transition-colors">
            WAKALAT.AI
          </Link>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md border border-stone-200">
          <h1 className="text-2xl font-bold text-center text-stone-800 mb-6">
            {isSignUp ? 'Create an Account' : 'Sign In'}
          </h1>
          
          <form>
            {isSignUp && (
              <InputField icon={<UserIcon size={20} />} type="text" placeholder="Full Name" />
            )}
            <InputField icon={<Mail size={20} />} type="email" placeholder="Email Address" />
            <InputField icon={<Lock size={20} />} type="password" placeholder="Password" />
            
            <button
              type="submit"
              className="w-full mt-4 px-4 py-2 bg-stone-800 text-white rounded-md font-semibold hover:bg-stone-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-800"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-stone-600">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={toggleForm}
              className="ml-2 font-semibold text-amber-700 hover:underline focus:outline-none"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}