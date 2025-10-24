'use client'; // Required for the hook
import Link from 'next/link';
import { Home, Scale, PanelLeftClose, X, ArrowRight } from 'lucide-react';
import { useSidebarStore } from '../store/sidebarStore';

const Sidebar = () => {
  const { isOpen, close } = useSidebarStore();

  const mainLinks = [
    { icon: <Home size={20} />, text: 'Home' },
    { icon: <Scale size={20} />, text: 'Acts and Laws' },
  ];

  // This adds a smooth transition effect
  const sidebarClasses = `
    fixed top-0 left-0 h-full w-72 bg-stone-50 dark:bg-zinc-900 border-r border-stone-200 dark:border-zinc-800 
    z-50 flex flex-col p-4 transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
  `;

  return (
    <aside className={sidebarClasses}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={close} className="p-1 text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-100">
          <PanelLeftClose size={20} />
        </button>
        <button onClick={close} className="p-1 text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-100">
          <X size={20} />
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex flex-col gap-2">
        {mainLinks.map((link) => (
          <a href="#" key={link.text} className="flex items-center gap-3 p-2 rounded-md text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-zinc-800 transition-colors">
            {link.icon}
            <span className="font-medium">{link.text}</span>
          </a>
        ))}
      </nav>

      <hr className="my-4 border-stone-300 dark:border-zinc-700" />

      {/* Previous Chats / All Cases */}
      <div className="flex-grow">
        <h3 className="px-2 mb-2 text-sm font-semibold text-stone-500 dark:text-stone-400 uppercase">PREVIOUS CHATS</h3>
        <p className="px-2 text-sm text-stone-600 dark:text-stone-500">Your cases appear here...</p>
      </div>

      {/* Upgrade Section */}
      <div className="mt-auto bg-stone-100 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-lg p-4">
        <h4 className="font-bold text-stone-800 dark:text-stone-200">Try Pro</h4>
        <p className="text-sm text-stone-600 dark:text-stone-400 my-1">Upgrade for increased limits, smarter searches and more.</p>
        <Link href="/coming-soon"
            className="flex items-center gap-2 w-full justify-center mt-3 px-4 py-2 bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-800 rounded-md text-sm font-semibold hover:bg-stone-900 dark:hover:bg-white transition-colors"
          >
          <ArrowRight size={16} />
          Learn More
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;