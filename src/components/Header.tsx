'use client'; // Required for the hook

import { Menu, User, Sun, Moon } from 'lucide-react';
import { useSidebarStore } from '../store/sidebarStore';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect';

const Header = () => {
  const { toggle } = useSidebarStore();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Use isomorphic layout effect to handle mounting
  useIsomorphicLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a skeleton loader
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm border-b border-stone-200 dark:border-zinc-800 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={toggle} className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100">
              <Menu size={24} />
            </button>
            <div className="text-xl font-bold text-stone-800 dark:text-stone-200">WAKALAT.AI</div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth">
              <button className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100">
                <User size={24} />
              </button>
            </Link>
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
            >
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;