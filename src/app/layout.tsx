'use client'; // This must be a client component to use hooks

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// --- Import the necessary components for the global sidebar ---
import Sidebar from "@/components/Sidebar";
import { useSidebarStore } from "@/store/sidebarStore";
import { AnimatePresence, motion } from "framer-motion";

const inter = Inter({ subsets: ["latin"] });

// Note: Metadata export is not supported in Client Components. 
// We will manage the title in the RootLayout component directly.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get sidebar state here, in the global layout
  const { isOpen, close } = useSidebarStore();

  // Set the document title
  if (typeof window !== 'undefined') {
    document.title = "WAKALAT-AI";
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-zinc-900 text-stone-800 dark:text-stone-300 font-sans">
            <Header />

            {/* --- GLOBAL SIDEBAR LOGIC --- */}
            {/* This now lives in the root layout and will work on every page */}
            <AnimatePresence>
              {isOpen && (
                <>
                  <Sidebar key="sidebar" />
                  <motion.div
                    key="overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={close} 
                    className="fixed inset-0 bg-black/50 z-40"
                    aria-hidden="true"
                  />
                </>
              )}
            </AnimatePresence>
            
            {/* The page content (e.g., Home or ChatPage) is rendered here */}
            {children}
            
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}