import { Product, UserPreference } from '../types';
import { products } from '../data/products';

// Keyword mapping for Indian context
const keywordMap: Record<string, string[]> = {
  'vegan': ['vegan', 'plant-based', 'plant based', 'no animal', 'pure veg'],
  'vegetarian': ['vegetarian', 'veg'],
  'protein': ['protein', 'proteins', 'protein-rich', 'proteinaceous'],
  'gluten-free': ['gluten-free', 'gluten free', 'no gluten', 'without gluten'],
  'summer': ['summer', 'hot', 'heat', 'warm weather', 'grishma'],
  'winter': ['winter', 'cold', 'cool', 'shita'],
  'monsoon': ['monsoon', 'rainy', 'rain', 'wet', 'varsha'],
  'ethnic': ['ethnic', 'traditional', 'indian', 'cultural', 'desi'],
  'casual': ['casual', 'everyday', 'regular', 'daily', 'informal'],
  'breakfast': ['breakfast', 'morning', 'morning meal', 'subah', 'nashta'],
  'snack': ['snack', 'snacks', 'munchies', 'small bites', 'light food', 'nashta'],
  'festive': ['festive', 'festival', 'celebration', 'tyohar', 'party'],
  'organic': ['organic', 'natural', 'chemical-free', 'pure'],
  'cotton': ['cotton', 'soft fabric', 'breathable', 'natural fabric'],
  'linen': ['linen', 'flax', 'breathable fabric'],
  'light': ['light', 'lightweight', 'airy', 'thin'],
  'trendy': ['trendy', 'fashionable', 'stylish', 'modern', 'in style']
};

// Extract user preferences from message
export const extractPreferences = (message: string): UserPreference => {
  const preferences: UserPreference = {};
  const lowerCaseMessage = message.toLowerCase();
  
  // Extract price range
  const priceMatch = lowerCaseMessage.match(/under ₹(\d+)/i) || 
                     lowerCaseMessage.match(/less than ₹(\d+)/i) || 
                     lowerCaseMessage.match(/below ₹(\d+)/i) ||
                     lowerCaseMessage.match(/within ₹(\d+)/i);
  
  if (priceMatch && priceMatch[1]) {
    preferences.priceRange = {
      min: 0,
      max: parseInt(priceMatch[1], 10)
    };
  }
  
  // Extract dietary preferences
  preferences.dietary = [];
  
  for (const [key, synonyms] of Object.entries(keywordMap)) {
    if (key === 'vegan' || key === 'vegetarian' || key === 'gluten-free' || key === 'protein' || key === 'organic') {
      for (const synonym of synonyms) {
        if (lowerCaseMessage.includes(synonym)) {
          if (!preferences.dietary.includes(key)) {
            preferences.dietary.push(key);
          }
          break;
        }
      }
    }
  }
  
  // Extract category
  if (lowerCaseMessage.includes('food') || 
      lowerCaseMessage.includes('snack') || 
      lowerCaseMessage.includes('breakfast') ||
      lowerCaseMessage.includes('eat') ||
      lowerCaseMessage.includes('meal') ||
      lowerCaseMessage.includes('munch') ||
      lowerCaseMessage.includes('diet') ||
      lowerCaseMessage.includes('protein') ||
      lowerCaseMessage.includes('cookies') ||
      lowerCaseMessage.includes('bars')) {
    preferences.category = 'food';
    
    // Extract sub-category
    if (lowerCaseMessage.includes('breakfast') || 
        lowerCaseMessage.includes('morning')) {
      preferences.subCategory = 'breakfast';
    } else if (lowerCaseMessage.includes('snack') || 
               lowerCaseMessage.includes('munch') ||
               lowerCaseMessage.includes('bite')) {
      preferences.subCategory = 'snacks';
    }
  } else if (lowerCaseMessage.includes('cloth') || 
             lowerCaseMessage.includes('wear') || 
             lowerCaseMessage.includes('dress') ||
             lowerCaseMessage.includes('fashion') ||
             lowerCaseMessage.includes('outfit') ||
             lowerCaseMessage.includes('kurta') ||
             lowerCaseMessage.includes('ethnic') ||
             lowerCaseMessage.includes('saree') ||
             lowerCaseMessage.includes('shirt') ||
             lowerCaseMessage.includes('tee') ||
             lowerCaseMessage.includes('t-shirt')) {
    preferences.category = 'fashion';
    
    // Extract sub-category
    if (lowerCaseMessage.includes('ethnic') || 
        lowerCaseMessage.includes('traditional') ||
        lowerCaseMessage.includes('indian') ||
        lowerCaseMessage.includes('kurta') ||
        lowerCaseMessage.includes('saree')) {
      preferences.subCategory = 'ethnic';
    } else if (lowerCaseMessage.includes('casual') || 
               lowerCaseMessage.includes('everyday') ||
               lowerCaseMessage.includes('tee') ||
               lowerCaseMessage.includes('t-shirt') ||
               lowerCaseMessage.includes('shirt')) {
      preferences.subCategory = 'casual';
    }
  }
  
  // Extract season
  for (const season of ['summer', 'winter', 'monsoon']) {
    const synonyms = keywordMap[season] || [];
    for (const synonym of synonyms) {
      if (lowerCaseMessage.includes(synonym)) {
        preferences.season = season;
        break;
      }
    }
    if (preferences.season) break;
  }
  
  // Extract occasion
  if (lowerCaseMessage.includes('casual') || 
      lowerCaseMessage.includes('everyday') || 
      lowerCaseMessage.includes('daily')) {
    preferences.occasion = 'casual';
  } else if (lowerCaseMessage.includes('festive') || 
             lowerCaseMessage.includes('festival') || 
             lowerCaseMessage.includes('celebration') ||
             lowerCaseMessage.includes('party')) {
    preferences.occasion = 'festive';
  } else if (lowerCaseMessage.includes('office') || 
             lowerCaseMessage.includes('work') || 
             lowerCaseMessage.includes('formal')) {
    preferences.occasion = 'office';
  }
  
  // Extract material preferences
  preferences.material = [];
  if (lowerCaseMessage.includes('cotton')) {
    preferences.material.push('cotton');
  }
  if (lowerCaseMessage.includes('linen')) {
    preferences.material.push('linen');
  }
  
  // Extract style preferences
  preferences.style = [];
  if (lowerCaseMessage.includes('trendy') || 
      lowerCaseMessage.includes('stylish') || 
      lowerCaseMessage.includes('modern')) {
    preferences.style.push('trendy');
  }
  if (lowerCaseMessage.includes('traditional') || 
      lowerCaseMessage.includes('ethnic') || 
      lowerCaseMessage.includes('indian')) {
    preferences.style.push('traditional');
  }
  if (lowerCaseMessage.includes('light') || 
      lowerCaseMessage.includes('lightweight') || 
      lowerCaseMessage.includes('airy')) {
    preferences.style.push('light');
  }
  
  return preferences;
};

// Calculate match percentage
const calculateMatchPercentage = (product: Product, preferences: UserPreference): number => {
  let matchPoints = 0;
  let totalPoints = 0;
  
  // Price match (highest priority)
  if (preferences.priceRange) {
    totalPoints += 30;
    if (product.price <= preferences.priceRange.max) {
      // Full points if under budget
      matchPoints += 30;
    } else if (product.price <= preferences.priceRange.max * 1.1) {
      // Partial points if slightly over budget (within 10%)
      matchPoints += 15;
    }
  }
  
  // Category match (high priority)
  if (preferences.category) {
    totalPoints += 25;
    if (product.category === preferences.category) {
      matchPoints += 25;
    }
  }
  
  // Sub-category match
  if (preferences.subCategory && preferences.category === product.category) {
    totalPoints += 15;
    if (product.subCategory === preferences.subCategory) {
      matchPoints += 15;
    }
  }
  
  // Dietary preferences match
  if (preferences.dietary && preferences.dietary.length > 0 && product.category === 'food') {
    preferences.dietary.forEach(pref => {
      totalPoints += 10;
      
      if (pref === 'vegan' && product.isVegan) {
        matchPoints += 10;
      } else if (pref === 'vegetarian' && product.isVegan) {
        matchPoints += 8; // Vegan is also vegetarian
      } else if (pref === 'gluten-free' && product.isGlutenFree) {
        matchPoints += 10;
      } else if (pref === 'protein' && product.proteinContent && product.proteinContent > 10) {
        matchPoints += 10;
      } else if (pref === 'protein' && product.proteinContent && product.proteinContent > 5) {
        matchPoints += 5;
      } else if (pref === 'organic' && product.tags.includes('organic')) {
        matchPoints += 10;
      }
    });
  }
  
  // Season match
  if (preferences.season && product.season && product.category === 'fashion') {
    totalPoints += 15;
    if (Array.isArray(product.season) && product.season.includes(preferences.season)) {
      matchPoints += 15;
    } else if (Array.isArray(product.season) && product.season.includes('all')) {
      matchPoints += 10;
    }
  }
  
  // Occasion match
  if (preferences.occasion && product.occasion && product.category === 'fashion') {
    totalPoints += 15;
    if (Array.isArray(product.occasion) && product.occasion.includes(preferences.occasion)) {
      matchPoints += 15;
    }
  }
  
  // Material match
  if (preferences.material && preferences.material.length > 0 && product.material && product.category === 'fashion') {
    totalPoints += 10;
    if (preferences.material.includes(product.material)) {
      matchPoints += 10;
    }
  }
  
  // Style match through tags
  if (preferences.style && preferences.style.length > 0 && product.tags && product.category === 'fashion') {
    preferences.style.forEach(style => {
      totalPoints += 5;
      if (product.tags.some(tag => tag.includes(style) || keywordMap[style]?.some(synonym => tag.includes(synonym)))) {
        matchPoints += 5;
      }
    });
  }
  
  // Default total points if none of the above applied
  if (totalPoints === 0) {
    return 50; // Base match percentage
  }
  
  const percentage = Math.round((matchPoints / totalPoints) * 100);
  return Math.min(Math.max(percentage, 50), 99); // Limit between 50-99%
};

// Generate personalized reason for recommendation
const generateMatchReason = (product: Product, preferences: UserPreference): string => {
  const reasons = [];
  
  // Price-based reason
  if (preferences.priceRange && product.price <= preferences.priceRange.max) {
    reasons.push(`fits your budget at ₹${product.price}`);
  }
  
  // Dietary-based reasons
  if (preferences.dietary && product.category === 'food') {
    if (preferences.dietary.includes('vegan') && product.isVegan) {
      reasons.push('perfect for your vegan diet');
    }
    if (preferences.dietary.includes('gluten-free') && product.isGlutenFree) {
      reasons.push('suitable for gluten-free needs');
    }
    if (preferences.dietary.includes('protein') && product.proteinContent) {
      reasons.push(`provides ${product.proteinContent}g of protein per serving`);
    }
    if (preferences.dietary.includes('organic') && product.tags.includes('organic')) {
      reasons.push('made with organic ingredients');
    }
  }
  
  // Material/features-based reasons for fashion
  if (product.category === 'fashion') {
    if (product.material === 'cotton' && (preferences.material?.includes('cotton') || preferences.season === 'summer')) {
      reasons.push('made with breathable cotton');
    } else if (product.material === 'linen' && (preferences.material?.includes('linen') || preferences.season === 'summer')) {
      reasons.push('crafted from cool linen fabric');
    }
    
    // Season-based reasons
    if (preferences.season === 'summer' && product.season?.includes('summer')) {
      reasons.push('perfect for hot summer days');
    } else if (preferences.season === 'winter' && product.season?.includes('winter')) {
      reasons.push('ideal for cold winter weather');
    } else if (preferences.season === 'monsoon' && product.season?.includes('monsoon')) {
      reasons.push('suitable for rainy monsoon season');
    }
    
    // Occasion-based reasons
    if (preferences.occasion === 'festive' && product.occasion?.includes('festive')) {
      reasons.push('designed for festive occasions');
    } else if (preferences.occasion === 'casual' && product.occasion?.includes('casual')) {
      reasons.push('perfect for casual everyday wear');
    } else if (preferences.occasion === 'office' && product.occasion?.includes('office')) {
      reasons.push('suitable for office and formal settings');
    }
  }
  
  // Default reason if none match
  if (reasons.length === 0) {
    if (product.category === 'food') {
      return `This premium food item aligns with your preferences.`;
    } else {
      return `This stylish ${product.subCategory} item matches your fashion preferences.`;
    }
  }
  
  // Create grammatically correct sentence
  if (reasons.length === 1) {
    return reasons[0].charAt(0).toUpperCase() + reasons[0].slice(1);
  } else if (reasons.length === 2) {
    return reasons[0].charAt(0).toUpperCase() + reasons[0].slice(1) + ' and ' + reasons[1];
  } else {
    const lastReason = reasons.pop();
    return reasons.map((reason, index) => index === 0 ? reason.charAt(0).toUpperCase() + reason.slice(1) : reason).join(', ') + ', and ' + lastReason;
  }
};

export const getRecommendations = (message: string): Product[] => {
  const preferences = extractPreferences(message);
  
  // Filter and rank products
  const recommendedProducts = products.map(product => {
    const matchPercentage = calculateMatchPercentage(product, preferences);
    const matchReason = generateMatchReason(product, preferences);
    
    return {
      ...product,
      matchPercentage,
      matchReason
    };
  })
  .filter(product => product.matchPercentage > 50) // Only show reasonable matches
  .sort((a, b) => (b.matchPercentage || 0) - (a.matchPercentage || 0))
  .slice(0, 4); // Get top 4 recommendations
  
  return recommendedProducts.length > 0 
    ? recommendedProducts 
    : products
        .slice(0, 4)
        .map(product => ({
          ...product,
          matchPercentage: 50,
          matchReason: 'Recommended based on popularity'
        }));
};
