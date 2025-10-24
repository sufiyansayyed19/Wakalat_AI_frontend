'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import InputArea from '../components/InputArea';
import Sidebar from '../components/Sidebar';
import { useSidebarStore } from '../store/sidebarStore';

export default function Home() {
  const { isOpen, close } = useSidebarStore();

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-300 font-sans">
      <Header />
      
      {/* Conditionally render the Sidebar */}
      {isOpen && <Sidebar />}

      {/* Conditionally render the overlay */}
      {isOpen && (
        <div 
          onClick={close} 
          className="fixed inset-0 bg-black/50 z-40"
          aria-hidden="true"
        />
      )}

      <main className="flex flex-1 flex-col items-center justify-center px-4">
        <InputArea />
      </main>
      
      <Footer />
    </div>
  );
}