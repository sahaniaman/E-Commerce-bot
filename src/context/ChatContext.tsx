import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ChatMessage, Product } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { getRecommendations } from '../utils/recommendationEngine';
import { getAiRecommendations, analyzeQuery } from '../services/gemini';
import { fetchProducts } from '../services/productService';
import { isRateLimitError, getApiErrorMessage } from '../utils/apiErrorUtils';

interface ChatContextType {
  messages: ChatMessage[];
  sendMessage: (text: string) => Promise<void>;
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
      text: "Namaste! 🙏 I'm your BharatShop AI assistant, powered by Google Gemini 2.0. I'm here to help you discover amazing Indian D2C food and fashion products. What are you looking for today? You can ask me about vegan snacks, traditional outfits, or anything else that interests you!",
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  const clearChat = () => {
    const welcomeMessage: ChatMessage = {
      id: uuidv4(),
      text: "Namaste! 🙏 I'm your BharatShop AI assistant, powered by Google Gemini 2.0. I'm here to help you discover amazing Indian D2C food and fashion products. What are you looking for today? You can ask me about vegan snacks, traditional outfits, or anything else that interests you!",
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

  const sendMessage = async (text: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    try {
      // Get recommendations based on user message
      const recommendations = await getRecommendations(text);
      
      // Get AI response from Gemini
      const aiResponse = await getAiRecommendations(text);
      
      // Create bot response with recommendations
      const botMessage: ChatMessage = {
        id: uuidv4(),
        text: aiResponse,
        sender: 'bot',
        timestamp: new Date(),
        recommendations
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error: any) {
      console.error('Error getting AI response:', error);
      
      // Get fallback recommendations using product service
      const fallbackProducts = await fetchProducts('popular', {});
      const recommendationsWithScore = fallbackProducts.slice(0, 4).map((product: Product) => ({
        ...product,
        matchPercentage: 50,
        matchReason: 'Recommended based on popularity'
      }));
      
      // Get a user-friendly error message
      const errorMessage = getApiErrorMessage(error);
      
      // Create error response message
      const botErrorMessage: ChatMessage = {
        id: uuidv4(),
        text: isRateLimitError(error) 
          ? "I'm experiencing high demand right now. Please try again in a moment." 
          : `Sorry, I encountered an issue: ${errorMessage}. Here are some popular products you might like:`,
        sender: 'bot',
        timestamp: new Date(),
        recommendations: recommendationsWithScore
      };
      
      setMessages(prev => [...prev, botErrorMessage]);
    } finally {
      setIsTyping(false);
    }
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
