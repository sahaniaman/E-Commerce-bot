import { Product } from '../types';
import { products as mockProducts } from '../data/products';

// List of available product data sources (only mock data for now)
export const PRODUCT_SOURCES = {
  MOCK: 'mock' // Only using mock data for now
};

/**
 * Fetches products from mock data
 * 
 * @param query The search query
 * @param filters Additional filters to apply
 * @returns A promise that resolves to an array of products
 */
export const fetchProducts = async (
  query: string,
  filters: Record<string, any> = {}
): Promise<Product[]> => {
  try {
    // Log search query for debugging
    console.log('Searching with query:', query, 'and filters:', filters);
    
    // Filter mock products based on the query and filters
    let filteredProducts = [...mockProducts];
    
    // Apply query filter if provided
    if (query) {
      const searchTerms = query.toLowerCase().split(' ');
      filteredProducts = filteredProducts.filter(product => {
        const searchableText = `${product.name} ${product.description} ${product.category} ${product.subCategory} ${product.tags.join(' ')}`.toLowerCase();
        return searchTerms.some(term => searchableText.includes(term));
      });
    }
    
    // Apply category filter if provided
    if (filters.category) {
      filteredProducts = filteredProducts.filter(product => 
        product.category.toLowerCase() === filters.category.toLowerCase()
      );
    }
    
    // Apply price range filter if provided
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange;
      if (minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(product => product.price >= minPrice);
      }
      if (maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
      }
    }
    
    // Add source and last updated information
    return filteredProducts.map(product => ({
      ...product,
      source: PRODUCT_SOURCES.MOCK,
      sourceId: product.id,
      sourceUrl: '#',
      lastUpdated: new Date()
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return mockProducts.map(product => ({
      ...product,
      source: PRODUCT_SOURCES.MOCK,
      sourceId: product.id,
      sourceUrl: '#',
      lastUpdated: new Date()
    }));
  }
};

/**
 * Creates search query from user preferences
 * 
 * @param preferences User preferences
 * @returns A search query string
 */
export const createSearchQuery = (preferences: any): string => {
  const queryParts = [];
  
  if (preferences.category) {
    queryParts.push(preferences.category);
  }
  
  if (preferences.subCategory) {
    queryParts.push(preferences.subCategory);
  }
  
  if (preferences.dietary && preferences.dietary.length > 0) {
    queryParts.push(...preferences.dietary);
  }
  
  if (preferences.material) {
    queryParts.push(preferences.material);
  }
  
  if (preferences.occasion && preferences.occasion.length > 0) {
    queryParts.push(preferences.occasion[0]);
  }
  
  if (preferences.season && preferences.season.length > 0) {
    queryParts.push(preferences.season[0]);
  }
  
  if (preferences.keywords && preferences.keywords.length > 0) {
    queryParts.push(...preferences.keywords);
  }
  
  return queryParts.join(' ');
};

/**
 * Creates filter options from user preferences
 * 
 * @param preferences User preferences
 * @returns Filter options
 */
export const createFilterOptions = (preferences: any): Record<string, any> => {
  const filters: Record<string, any> = {};
  
  if (preferences.category) {
    filters.category = preferences.category;
  }
  
  if (preferences.subCategory) {
    filters.subCategory = preferences.subCategory;
  }
  
  if (preferences.priceRange) {
    filters.priceRange = preferences.priceRange;
  }
  
  return filters;
};

/**
 * Fetches product details by ID
 * 
 * @param id The product ID
 * @returns A promise that resolves to the product details
 */
export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    // For mock data, find in the local data
    const mockProduct = mockProducts.find(product => product.id === id);
    
    if (mockProduct) {
      return {
        ...mockProduct,
        source: PRODUCT_SOURCES.MOCK,
        sourceId: mockProduct.id,
        sourceUrl: '#',
        lastUpdated: new Date()
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching product details for ID ${id}:`, error);
    return null;
  }
};
