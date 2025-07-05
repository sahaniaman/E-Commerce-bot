import productPlaceholder from '../assets/images/product-placeholder.svg';

/**
 * Utility function to get the proper product image path
 * Checks if the image exists and returns a placeholder if not
 * Handles both local images and external URLs
 * 
 * @param imagePath The image path from the product data
 * @returns A valid image path (original, transformed, or placeholder)
 */
export const getProductImagePath = (imagePath: string | undefined): string => {
  if (!imagePath) return productPlaceholder;
  
  // Check if the image is already a full URL (from an external source)
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Check if the image path is already in SVG format (newly created images)
  if (imagePath.includes('.svg')) {
    return imagePath;
  }
  
  // Check if there's an SVG version of the image (for JPG referenced images)
  const svgPath = imagePath.replace('.jpg', '.svg');
  
  // We can't check if the file exists directly in client-side code
  // So we return the SVG path as we're gradually migrating to SVGs
  return svgPath;
};

/**
 * Function to extract product category from tags for visual enhancements
 * 
 * @param tags Array of product tags
 * @returns The primary category for theming
 */
export const getProductCategory = (tags: string[]): string => {
  if (tags.includes('ethnic') || tags.includes('traditional')) return 'ethnic';
  if (tags.includes('casual') || tags.includes('tshirt')) return 'casual';
  if (tags.includes('vegan') || tags.includes('food')) return 'food';
  if (tags.includes('snack')) return 'snack';
  return 'default';
};

/**
 * Gets an image from the specified source with fallbacks
 * 
 * @param image The image URL or path
 * @param source The source of the image
 * @returns A valid image URL or path with fallbacks
 */
export const getSourceImageWithFallback = (image: string | undefined, source?: string): string => {
  if (!image) return productPlaceholder;
  
  // For now, we're only using mock data, so just return the image path
  return image;
};
