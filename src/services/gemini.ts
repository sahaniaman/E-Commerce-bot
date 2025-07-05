import envConfig from '../config/env';

// Get the API key from environment variables
const apiKey = process.env.REACT_APP_GEMINI_API_KEY || envConfig.GEMINI_API_KEY;

// Log information about env vars (without exposing the key)
console.log('Gemini API key status:', apiKey ? 'API key is set' : 'API key is NOT set');

// Base URL for Gemini API
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
const GEMINI_MODEL = 'gemini-2.0-flash';

/**
 * Gets product recommendations from Gemini based on the user's message
 * @param message The user's message
 * @returns A promise that resolves to the AI response
 */
export const getAiRecommendations = async (message: string): Promise<string> => {
  // If API key is missing, use a fallback response
  if (!apiKey) {
    console.warn('Using fallback response due to missing Gemini API key');
    return `Based on your request for "${message}", here are some recommended products that might interest you.`;
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}/${GEMINI_MODEL}:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are an AI shopping assistant for BharatShop, an Indian D2C e-commerce platform 
                       that specializes in food and fashion products. Your task is to understand the user's 
                       request and provide relevant product recommendations.
                       
                       Respond in a friendly, helpful manner and always maintain the persona of a shopping assistant.
                       If the user asks for product recommendations, suggest relevant products from Indian D2C brands.
                       Consider Indian context, terminology, and preferences in your responses.
                       
                       User query: ${message}`
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      // Handle API errors based on status code
      if (response.status === 429) {
        console.error('Gemini API rate limit exceeded');
        
        // Dispatch global event for rate limit error
        const rateLimitEvent = new CustomEvent('gemini_error', { 
          detail: { 
            type: 'rate_limit',
            message: 'Gemini API rate limit exceeded. Using local recommendations.'
          } 
        });
        window.dispatchEvent(rateLimitEvent);
        
        return "I apologize, but our AI service is currently experiencing high demand. I'll use my built-in knowledge to help you instead.";
      }
      
      throw new Error(`Gemini API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return data.contents?.[0]?.parts?.[0]?.text || 
      "I'm sorry, I couldn't process your request at the moment. Please try again.";
  } catch (error: any) {
    console.error('Error calling Gemini API:', error);
    
    // Check if it's a rate limit error (API might have different ways to indicate this)
    if (error?.message?.includes('429') || error?.message?.toLowerCase().includes('rate limit')) {
      console.error('Gemini API rate limit exceeded');
      
      // Dispatch global event for rate limit error
      const rateLimitEvent = new CustomEvent('gemini_error', { 
        detail: { 
          type: 'rate_limit',
          message: 'Gemini API rate limit exceeded. Using local recommendations.'
        } 
      });
      window.dispatchEvent(rateLimitEvent);
      
      return "I apologize, but our AI service is currently experiencing high demand. I'll use my built-in knowledge to help you instead.";
    }
    
    return "Sorry, I'm having trouble connecting to my recommendation engine. Please try again later.";
  }
};

/**
 * Analyzes a product query and returns enhanced metadata 
 * @param query The product search query
 * @returns Enhanced metadata for product matching
 */
export const analyzeQuery = async (query: string) => {
  // If API key is missing, return empty object to fall back to local processing
  if (!apiKey) {
    console.warn('Skipping query analysis due to missing Gemini API key');
    return {};
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}/${GEMINI_MODEL}:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Extract key product attributes from the user's query and return ONLY a valid JSON object with the following properties:
                       - category: The main product category (food, fashion)
                       - subCategory: More specific category if available
                       - priceRange: Price range if mentioned (min, max)
                       - attributes: Array of key product attributes (vegan, cotton, etc.)
                       - intent: The user's purchase intent (browsing, buying)
                       - mood: The emotional context of the query
                       
                       User query: ${query}
                       
                       Respond with ONLY the JSON object with NO additional text or explanation.`
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      // Handle API errors based on status code
      if (response.status === 429) {
        // Dispatch rate limit event
        const rateLimitEvent = new CustomEvent('gemini_error', { 
          detail: { 
            type: 'rate_limit',
            message: 'Gemini API rate limit exceeded'
          } 
        });
        window.dispatchEvent(rateLimitEvent);
      }
      
      throw new Error(`Gemini API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const content = data.contents?.[0]?.parts?.[0]?.text || "{}";
    
    // Extract JSON from the response text (in case Gemini adds extra text)
    // Using a basic regex without 's' flag for compatibility
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[0] : "{}";
    
    try {
      return JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Error parsing JSON from Gemini response:', parseError);
      return {};
    }
  } catch (error: any) {
    console.error('Error analyzing query with Gemini:', error);
    
    // Check if it's a rate limit error
    if (error?.message?.includes('429') || error?.message?.toLowerCase().includes('rate limit')) {
      // Dispatch rate limit event
      const rateLimitEvent = new CustomEvent('gemini_error', { 
        detail: { 
          type: 'rate_limit',
          message: 'Gemini API rate limit exceeded'
        } 
      });
      window.dispatchEvent(rateLimitEvent);
    }
    
    return {};
  }
};
