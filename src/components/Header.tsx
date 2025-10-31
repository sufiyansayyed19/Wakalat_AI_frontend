'use client';

import { Menu, User, Sun, Moon } from 'lucide-react';
import { useSidebarStore } from '../store/sidebarStore';
import { useAuthModalStore } from '../store/authModalStore';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Header = () => {
  const { toggle } = useSidebarStore();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  const isChatPage = pathname?.startsWith('/chat/');

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-30 h-16 ${
      isChatPage 
        ? 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm' 
        : 'bg-white dark:bg-zinc-800 border-b border-stone-200 dark:border-zinc-800'
    }`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={toggle} className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100">
              <Menu size={24} />
            </button>
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image src="/brown_logo.png" alt="Logo" width={32} height={32} className="block dark:hidden" />
              <Image src="/white_logo.png" alt="Logo" width={32} height={32} className="hidden dark:block" />
              <div className="text-xl font-bold text-stone-800 dark:text-stone-200">WAKALAT.AI</div>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {/* ... (rest of the header remains the same) ... */}
            <button 
              onClick={() => useAuthModalStore.getState().open()}
              className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
            >
              <User size={24} />
            </button>
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