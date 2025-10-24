'use client';

import { ArrowUp } from 'lucide-react';

const InputArea = () => {
  return (
    <div className="w-full max-w-3xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-3xl font-medium text-stone-800 dark:text-stone-200">
          I&apos;m <span className="font-bold">WAKALAT</span>, your legal expert, powered by AI.
        </h1>
      </div>

      <div className="flex items-center justify-center gap-2 mb-4">
        <button className="px-3 py-1.5 text-sm font-medium text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-zinc-800 rounded-md hover:bg-stone-200 dark:hover:bg-zinc-700 transition-colors">
          Judgements <span className="ml-1.5 bg-stone-300 dark:bg-zinc-700 text-stone-500 dark:text-stone-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full">PRO</span>
        </button>
        <button className="px-3 py-1.5 text-sm font-medium text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-zinc-800 rounded-md hover:bg-stone-200 dark:hover:bg-zinc-700 transition-colors">
          Document Intelligence <span className="ml-1.5 bg-stone-300 dark:bg-zinc-700 text-stone-500 dark:text-stone-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full">PRO</span>
        </button>
        <button className="px-3 py-1.5 text-sm font-medium text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-zinc-800 rounded-md hover:bg-stone-200 dark:hover:bg-zinc-700 transition-colors">
          Draft Response
        </button>
      </div>
      
      <div className="relative">
        <textarea
          className="w-full h-28 sm:h-32 p-4 pr-16 text-md bg-stone-100 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-2xl resize-none text-stone-800 dark:text-stone-200 placeholder:text-stone-500 dark:placeholder:text-stone-400 focus:bg-white dark:focus:bg-zinc-800 focus:ring-2 focus:ring-amber-700 focus:outline-none transition"
          placeholder="Start typing your query to start an in-depth research..."
        />
        <button className="absolute bottom-4 right-4 bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-800 rounded-full p-2 hover:bg-stone-900 dark:hover:bg-white transition-colors">
          <ArrowUp size={20} />
        </button>
      </div>

      <div className="text-center mt-3">
        <p className="text-xs text-stone-500 dark:text-stone-400">WAKALAT.AI can make mistakes. Check important info.</p>
      </div>
    </div>
  );
};

export default InputArea;