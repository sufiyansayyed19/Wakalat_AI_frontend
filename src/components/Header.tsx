'use client';

import { Menu, User, Sun, Moon } from 'lucide-react';
import { useSidebarStore } from '../store/sidebarStore';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Image from 'next/image'; // Import the Image component

const Header = () => {
  const { toggle } = useSidebarStore();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border-b border-stone-200 dark:border-zinc-800 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={toggle} className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100">
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2">
              <Image src="/brown_logo.png" alt="Logo" width={32} height={32} className="block dark:hidden" />
              <Image src="/white_logo.png" alt="Logo" width={32} height={32} className="hidden dark:block" />
              <div className="text-xl font-bold text-stone-800 dark:text-stone-200">WAKALAT.AI</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* ... (rest of the header remains the same) ... */}
            <Link href="/auth">
              <button className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100">
                <User size={24} />
              </button>
            </Link>
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
              disabled={!mounted}
            >
              {mounted && (theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />)}
              {!mounted && <div className="w-6 h-6" />} 
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;