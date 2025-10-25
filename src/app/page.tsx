'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import InputArea from '../components/InputArea';
import Sidebar from '../components/Sidebar';
import { useSidebarStore } from '../store/sidebarStore';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  const { isOpen, close } = useSidebarStore();

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-zinc-800 text-stone-800 dark:text-stone-300 font-sans">
      <Header />
      
      {/* --- THIS IS THE CORRECTED CODE --- */}
      {/* We have removed the fragment (<>) wrapper */}
      <AnimatePresence>
        {isOpen && [
          <Sidebar key="sidebar" />,
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close} 
            className="fixed inset-0 bg-black/50 z-40"
            aria-hidden="true"
          />
        ]}
      </AnimatePresence>

      <main className="flex flex-1 flex-col items-center justify-center px-4">
        <InputArea />
      </main>
      
      <Footer />
    </div>
  );
}