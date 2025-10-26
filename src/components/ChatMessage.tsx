'use client';

import { User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown'; // --- NEW: Import ReactMarkdown

interface ChatMessageProps {
  role: 'User' | 'Model';
  content: string;
}

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isModel = role === 'Model';

  return (
    <div className={`flex items-start gap-4 p-4 rounded-lg ${isModel ? 'bg-stone-100 dark:bg-zinc-800' : ''}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isModel ? 'bg-amber-600 text-white' : 'bg-stone-200 dark:bg-zinc-700'}`}>
        {isModel ? <Bot size={20} /> : <User size={20} />}
      </div>
      <div className="flex-grow pt-1 text-stone-800 dark:text-stone-200">
        <p className="font-semibold mb-2">{isModel ? 'WAKALAT.AI' : 'You'}</p>
        
        {/* --- THIS IS THE FIX --- */}
        {/* We replace the manual formatting with the ReactMarkdown component. */}
        {/* The 'prose' class from the typography plugin will style the output. */}
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;