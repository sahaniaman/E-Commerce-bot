import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ChatMessage, Product } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { getRecommendations } from '../utils/recommendationEngine';

interface ChatContextType {
  messages: ChatMessage[];
  sendMessage: (text: string) => void;
  isTyping: boolean;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: uuidv4(),
      text: "Hi! I'm your personal shopping assistant for Indian D2C food and fashion products. What are you looking for today?",
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  const clearChat = () => {
    const welcomeMessage: ChatMessage = {
      id: uuidv4(),
      text: "Hi! I'm your personal shopping assistant for Indian D2C food and fashion products. What are you looking for today?",
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  };

  const generateBotResponse = (text: string, recommendations: Product[]): string => {
    if (recommendations.length === 0) {
      return "I couldn't find exact matches for your request. Here are some popular items you might like:";
    }

    const responseIntros = [
      "Perfect! Here are my top recommendations for you:",
      "Great choice! I've found these items for you:",
      "Here are some products that match your preferences:",
      "Based on what you're looking for, I recommend these:",
      "I think you'll love these recommendations:"
    ];

    return responseIntros[Math.floor(Math.random() * responseIntros.length)];
  };

  const sendMessage = (text: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Simulate bot thinking time (between 1-2 seconds)
    setTimeout(() => {
      // Get recommendations based on user message
      const recommendations = getRecommendations(text);
      
      // Create bot response with recommendations
      const botResponse = generateBotResponse(text, recommendations);
      
      const botMessage: ChatMessage = {
        id: uuidv4(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        recommendations
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, isTyping, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
