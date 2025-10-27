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
      

      <main className="flex flex-1 flex-col items-center pt-16 px-4 overflow-y-auto">
        <InputArea />
      </main>
      
      <Footer />
    </div>
  );
}