import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid'; // We'll need to install this library

// --- 1. Define the types for our data ---
export interface Message {
  role: 'User' | 'Model';
  content: string;
  isStreamed?: boolean; // Track if this message has been streamed
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

interface ChatState {
  chats: Chat[];
  activeChatId: string | null;
  createChat: (userInput: string, customTitle?: string) => string; // Returns the ID of the new chat, accepts optional custom title
  addMessage: (chatId: string, message: Message) => void;
  setActiveChatId: (chatId: string | null) => void;
  markMessageAsStreamed: (chatId: string, messageIndex: number) => void; // New function
  sendMessageWithGemini: (chatId: string, userMessage: string, useStreaming?: boolean) => Promise<void>; // New: Send message with Gemini
  updateStreamingMessage: (chatId: string, messageIndex: number, content: string) => void; // New: Update streaming message content
}

// --- 2. Create the Zustand store ---
export const useChatStore = create<ChatState>((set, get) => ({
  chats: [
    // We can pre-load the store with your existing dummy data for now
    {
      id: 'theft-assault-cheating-case',
      title: 'Shop Robbery Case',
      messages: [
        {
          role: 'User',
          content: `My shop was robbed on April 15th, 2025, in Dadar. The accused, Ravi Sharma, used a knife during the robbery. Two local shopkeepers witnessed the event. We have CCTV footage and have recovered some of the stolen items. The FIR is No. 23/2025 at Dadar PS. What are the relevant laws and potential legal actions?`
        },
        {
          role: 'Model',
          content: `Based on the details provided, here is a preliminary analysis...` // Keeping this short for brevity
        }
      ]
    }
  ],
  activeChatId: null,

  setActiveChatId: (chatId) => set({ activeChatId: chatId }),

  createChat: (userInput, customTitle) => {
    const newChatId = uuidv4();
    const newChatTitle = customTitle || (userInput.split(' ').slice(0, 5).join(' ') + '...');

    const newChat: Chat = {
      id: newChatId,
      title: newChatTitle,
      messages: [
        { role: 'User', content: userInput },
        // Don't add mock response - Gemini will handle it
      ],
    };

    set((state) => ({
      chats: [newChat, ...state.chats], // Add new chat to the top of the list
    }));

    return newChatId; // Return the new ID so we can navigate to it
  },

  addMessage: (chatId, message) => {
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      ),
    }));
  },

  markMessageAsStreamed: (chatId, messageIndex) => {
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: chat.messages.map((msg, idx) =>
                idx === messageIndex ? { ...msg, isStreamed: true } : msg
              ),
            }
          : chat
      ),
    }));
  },

  updateStreamingMessage: (chatId, messageIndex, content) => {
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: chat.messages.map((msg, idx) =>
                idx === messageIndex ? { ...msg, content } : msg
              ),
            }
          : chat
      ),
    }));
  },

  sendMessageWithGemini: async (chatId, userMessage, useStreaming = true) => {
    // Add user message
    get().addMessage(chatId, { role: 'User', content: userMessage });

    // Get conversation history
    const chat = get().chats.find((c) => c.id === chatId);
    const conversationHistory =
      chat?.messages
        .filter((msg) => msg.role !== 'User' || msg.content !== userMessage)
        .map((msg) => ({
          role: msg.role === 'User' ? ('user' as const) : ('model' as const),
          content: msg.content,
        })) || [];

    // Create placeholder for model response
    const messageIndex = chat?.messages.length || 0;
    get().addMessage(chatId, { role: 'Model', content: '', isStreamed: false });

    try {
      if (useStreaming) {
        // Streaming response
        const response = await fetch('/api/gemini/stream', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: userMessage,
            conversationHistory,
            useMCPTools: true,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to get streaming response');
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let accumulatedContent = '';

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            accumulatedContent += chunk;
            get().updateStreamingMessage(chatId, messageIndex, accumulatedContent);
          }
        }

        // Mark as streamed
        get().markMessageAsStreamed(chatId, messageIndex);
      } else {
        // Non-streaming response
        const response = await fetch('/api/gemini/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: userMessage,
            conversationHistory,
            useMCPTools: true,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to get response');
        }

        const data = await response.json();
        if (data.success) {
          get().updateStreamingMessage(chatId, messageIndex, data.response);
          get().markMessageAsStreamed(chatId, messageIndex);
        } else {
          throw new Error(data.error || 'Unknown error');
        }
      }
    } catch (error) {
      console.error('Error sending message with Gemini:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to get response from Gemini. Please check your API key configuration.';
      get().updateStreamingMessage(chatId, messageIndex, errorMessage);
      get().markMessageAsStreamed(chatId, messageIndex);
    }
  },
}));