'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface StreamingChatMessageProps {
  content: string;
  onStreamComplete?: () => void;
}

// This component simulates a streaming text effect for a better UX
const StreamingChatMessage = ({ content, onStreamComplete }: StreamingChatMessageProps) => {
  const [displayedContent, setDisplayedContent] = useState('');

  useEffect(() => {
    setDisplayedContent(''); // Reset on new content
    let index = 0;
    const words = content.split(' ');

    const intervalId = setInterval(() => {
      if (index < words.length) {
        setDisplayedContent((prev) => prev + (index > 0 ? ' ' : '') + words[index]);
        index++;
      } else {
        clearInterval(intervalId);
        // Call the callback when streaming is complete
        if (onStreamComplete) {
          onStreamComplete();
        }
      }
    }, 50); // Adjust speed of streaming here (lower is faster)

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [content, onStreamComplete]);

  return (
    <div className="prose prose-invert max-w-none text-[#e3e3e3]">
      <ReactMarkdown>{displayedContent}</ReactMarkdown>
    </div>
  );
};

export default StreamingChatMessage;