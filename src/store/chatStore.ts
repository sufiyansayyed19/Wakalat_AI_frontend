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
}

// --- 2. Define the placeholder response ---
const MOCK_RESPONSE_TEXT = "Thank you for your submission. Our system is processing your case details. Please note that the full backend analysis is currently under development. This is a simulated response to demonstrate the final user interface. When the backend is live, you will receive a complete legal analysis here.";

// --- 3. Create the Zustand store ---
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
        { role: 'Model', content: MOCK_RESPONSE_TEXT, isStreamed: false }
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

    // If the message being added is a user message, add a follow-up mock response
    if (message.role === 'User') {
      setTimeout(() => {
        get().addMessage(chatId, { role: 'Model', content: MOCK_RESPONSE_TEXT, isStreamed: false });
      }, 500);
    }
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
}));