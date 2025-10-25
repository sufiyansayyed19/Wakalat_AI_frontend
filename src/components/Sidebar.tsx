'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSidebarStore } from '../store/sidebarStore';
import { Plus, PanelLeftClose, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

const sidebarVariants = {
  open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 40 } },
  closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 40 } },
};

const chatHistory = {
  "Today": ["Theft / Assault / Cheating Case Details"],
  "7 Days": ["Analysis of a Cybercrime Phishing Incident", "Property Dispute - Unlawful Possession"],
  "30 Days": ["Family Case - Judicial Separation", "Initial query about Indian Penal Code"],
};

const Sidebar = () => {
  const { isOpen, close } = useSidebarStore(); // Get the 'close' function from the store

  return (
    <motion.aside
      variants={sidebarVariants}
      initial="closed"
      animate="open"
      exit="closed"
      className="fixed top-0 left-0 h-full w-72 bg-stone-50 dark:bg-zinc-900 border-r border-stone-200 dark:border-zinc-800 z-50 flex flex-col"
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/brown_logo.png" alt="Logo" width={32} height={32} className="block dark:hidden" />
            <Image src="/white_logo.png" alt="Logo" width={32} height={32} className="hidden dark:block" />
            <span className="text-xl font-bold text-stone-800 dark:text-stone-200">WAKALAT.AI</span>
          </Link>
          {/* --- THIS IS THE CHANGE --- */}
          {/* It's now a button that calls the 'close' function */}
          <button 
            onClick={close} 
            className="p-1 text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-100"
          >
            <PanelLeftClose size={20} />
          </button>
        </div>

        {/* ... (rest of the sidebar remains the same) ... */}
        <Link 
          href="/coming-soon"
          className="flex items-center gap-2 w-full justify-center mb-4 px-4 py-2 bg-zinc-800 text-stone-200 rounded-md text-sm font-semibold hover:bg-zinc-700 transition-colors"
        >
          <Plus size={16} />
          New Chat
        </Link>
        
        <nav className="flex-grow overflow-y-auto -mr-2 pr-2">
          {Object.entries(chatHistory).map(([group, chats]) => (
            <div key={group} className="mb-4">
              <h3 className="px-2 mb-1 text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase">{group}</h3>
              {chats.map((title) => (
                <Link
                  href="/coming-soon"
                  key={title}
                  className="block p-2 text-sm text-stone-700 dark:text-stone-300 rounded-md hover:bg-stone-200 dark:hover:bg-zinc-800 truncate"
                >
                  {title}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className="mt-auto border-t border-stone-200 dark:border-zinc-700 pt-4">
          <Link 
            href="/coming-soon"
            className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-stone-200 dark:hover:bg-zinc-800"
          >
            <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center font-bold text-white">
              S
            </div>
            <span className="font-semibold text-sm text-stone-800 dark:text-stone-200">Sufiyan Sayyed</span>
            <MoreHorizontal size={20} className="ml-auto text-stone-500 dark:text-stone-400" />
          </Link>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;