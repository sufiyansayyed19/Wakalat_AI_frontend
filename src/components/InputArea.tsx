'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUp } from 'lucide-react';

type InputView = 'quick' | 'form';

const InputArea = () => {
  const [activeView, setActiveView] = useState<InputView>('quick');

  const getButtonClassName = (viewName: InputView) => {
    const isActive = activeView === viewName;

    const baseClasses = "px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none";
    
    // Cleanly define styles for active and inactive states
    const activeClasses = "bg-stone-800 dark:bg-zinc-700 text-white";
    const inactiveClasses = "bg-stone-200 dark:bg-zinc-800 text-stone-600 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-zinc-700";

    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="flex items-center justify-center gap-4 mb-6">
        <h1 className="text-3xl font-medium text-stone-800 dark:text-stone-200">
          Any new case?
        </h1>
      </div>

      <div className="flex items-center justify-center gap-2 mb-6">
        <button onClick={() => setActiveView('quick')} className={getButtonClassName('quick')}>
          Quick Input
        </button>
        <button onClick={() => setActiveView('form')} className={getButtonClassName('form')}>
          Guided Form <span className="text-amber-600 dark:text-slate-300 font-normal ml-1">(recommended)</span>
        </button>
      </div>
      
      <div className="relative">
        {activeView === 'quick' && (
          <div>
            <textarea
              className="w-full h-40 p-4 text-md bg-stone-100 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-lg resize-none text-stone-800 dark:text-stone-200 placeholder:text-stone-500 dark:placeholder:text-stone-400 focus:bg-white dark:focus:bg-zinc-800 focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 focus:outline-none transition-all duration-200"
              placeholder="Paste the full case description, FIR details, or narrative here..."
            />
            <div className="text-center my-4 text-sm text-stone-500 dark:text-stone-400 font-semibold">OR</div>
            <div className="flex items-center justify-center p-6 border-2 border-dashed border-stone-300 dark:border-zinc-700 rounded-lg">
              <p className="text-stone-500 dark:text-stone-400">PDF/DOCX upload will be available here soon.</p>
            </div>
          </div>
        )}

        {activeView === 'form' && (
          <div className="p-6 bg-stone-100 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-lg">
            <div className="mb-4">
              <label htmlFor="case-type" className="block text-sm font-medium mb-1 text-stone-700 dark:text-stone-300">Case Type</label>
              <input type="text" id="case-type" placeholder="e.g., Criminal, Civil, Cybercrime" className="w-full p-2 bg-white dark:bg-zinc-900 border border-stone-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500/30 focus:border-amber-500/30 transition-all duration-200" />
            </div>
            <div className="mb-4">
              <label htmlFor="incident-date" className="block text-sm font-medium mb-1 text-stone-700 dark:text-stone-300">Date of Incident</label>
              <input type="date" id="incident-date" className="w-full p-2 bg-white dark:bg-zinc-900 border border-stone-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500/30 focus:border-amber-500/30 transition-all duration-200" />
            </div>
             <div className="mb-4">
              <label htmlFor="complainant-name" className="block text-sm font-medium mb-1 text-stone-700 dark:text-stone-300">Complainant Name</label>
              <input type="text" id="complainant-name" placeholder="Enter full name" className="w-full p-2 bg-white dark:bg-zinc-900 border border-stone-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500/30 focus:border-amber-500/30 transition-all duration-200" />
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center mt-6">
        <button className="flex items-center gap-2 px-12 py-3 bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-800 rounded-full font-semibold hover:bg-stone-900 dark:hover:bg-white transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-amber-500/30 focus:ring-offset-1">
          <ArrowUp size={20} />
          Submit for Analysis
        </button>
      </div>
      <div className="text-center mt-4">
        <p className="text-xs text-stone-500 dark:text-stone-400">WAKALAT.AI can make mistakes. Check important info.</p>
      </div>
    </div>
  );
};

export default InputArea;