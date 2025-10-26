'use client'; // --- STEP 1: Explicitly mark this as a Client Component ---

import { notFound, useParams } from 'next/navigation'; // --- STEP 2: Import useParams ---
import { CHAT_DATA } from '@/lib/dummy-data';
import ChatMessage from '@/components/ChatMessage';
import React from 'react';

// --- STEP 3: Remove the 'params' prop from the function signature ---
export default function ChatPage() {
  
  // --- STEP 4: Call the useParams hook to get the route parameters ---
  const params = useParams();
  const id = params.id as string; // Assert the type for safety

  const chat = CHAT_DATA.find(c => c.id === id);

  if (!chat) {
    notFound();
  }

  return (
    <main className="flex-1 overflow-y-auto pt-16 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6 text-stone-800 dark:text-stone-200">{chat.title}</h1>
        <div className="space-y-4 pb-4">
          {chat.messages.map((message, index) => (
            <ChatMessage key={index} role={message.role as 'User' | 'Model'} content={message.content} />
          ))}
        </div>
      </div>
    </main>
  );
}