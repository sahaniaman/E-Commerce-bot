export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  subCategory: string;
  description: string;
  image: string;
  tags: string[];
  isVegan?: boolean;
  isGlutenFree?: boolean;
  proteinContent?: number;
  dietaryInfo?: string[];
  material?: string;
  season?: string[];
  occasion?: string[];
  matchPercentage?: number;
  matchReason?: string;
}

export interface UserPreference {
  dietary?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  category?: string;
  subCategory?: string;
  occasion?: string;
  season?: string;
  style?: string[];
  material?: string[];
  other?: string[];
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  recommendations?: Product[];
}
