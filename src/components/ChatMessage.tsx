'use client';

import { User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  role: 'User' | 'Model';
  content: string;
}

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isUser = role === 'User';

  return (
    <div className={`w-full px-4 md:px-6 lg:px-8 py-4 flex ${isUser ? 'bg-white dark:bg-transparent' : 'bg-stone-100 dark:bg-[#171717]'}`}>
      <div className="w-full max-w-4xl mx-auto flex items-start gap-6">
        {!isUser && (
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-orange-500/10 dark:bg-blue-500/10">
            <Bot size={20} className="text-orange-500 dark:text-orange-400" />
          </div>
        )}
        
        <div className={`flex-grow ${isUser ? 'text-stone-700 dark:text-white' : 'text-stone-800 dark:text-[#e3e3e3]'}`}>
          {!isUser && (
            <div className="mb-1 text-sm font-medium text-orange-600 dark:text-orange-400">
              WAKALAT.AI
            </div>
          )}
          
          <div className={`prose dark:prose-invert max-w-none ${isUser ? 'text-stone-700 dark:text-[#e3e3e3]' : 'text-stone-800 dark:text-[#e3e3e3]'}`}>
            <ReactMarkdown>
              {content}
            </ReactMarkdown>
          </div>
        </div>

        {isUser && (
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-orange-500/10 dark:bg-blue-500/10">
            <User size={20} className="text-orange-500 dark:text-orange-400" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;