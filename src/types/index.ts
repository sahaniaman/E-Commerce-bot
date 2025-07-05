export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  subCategory: string;
  description: string;
  image: string;
  tags: string[];
  source?: string;           // Source of the product data (e.g., 'amazon', 'flipkart', 'local')
  sourceId?: string;         // Original ID from the source
  sourceUrl?: string;        // Link to the product on the source website
  rating?: number;           // Product rating
  reviewCount?: number;      // Number of reviews
  availability?: string;     // Product availability status
  lastUpdated?: Date;        // Timestamp of when the data was last fetched
  
  // Food-specific properties
  isVegan?: boolean;
  isGlutenFree?: boolean;
  proteinContent?: number;
  dietaryInfo?: string[];
  
  // Fashion-specific properties
  material?: string;
  season?: string[];
  occasion?: string[];
  
  // Recommendation properties
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
