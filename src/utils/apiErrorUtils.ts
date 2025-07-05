/**
 * Utility functions for handling AI API errors (OpenAI and Gemini)
 */

/**
 * Checks if an error is an API rate limit error
 * @param error The error to check
 * @returns True if the error is a rate limit error
 */
export const isRateLimitError = (error: any): boolean => {
  return (
    error?.status === 429 || 
    error?.message?.includes('429') || 
    error?.message?.includes('rate limit') ||
    error?.error?.type === 'rate_limit_exceeded'
  );
};

/**
 * Dispatches a global event for AI API errors
 * @param error The error to dispatch
 * @param source The source of the error ('openai' or 'gemini')
 */
export const dispatchApiError = (error: any, source: 'openai' | 'gemini' = 'gemini') => {
  const errorType = isRateLimitError(error) ? 'rate_limit' : 'api_error';
  
  const errorEvent = new CustomEvent(`${source}_error`, { 
    detail: { 
      type: errorType,
      message: error?.message || `${source.toUpperCase()} API error`,
      status: error?.status,
      error: error
    } 
  });
  
  window.dispatchEvent(errorEvent);
  
  console.error(`${source.toUpperCase()} API ${errorType} dispatched`, error);
};

/**
 * Get a user-friendly error message for OpenAI API errors
 * @param error The error to get a message for
 * @returns A user-friendly error message
 */
export const getApiErrorMessage = (error: any): string => {
  if (isRateLimitError(error)) {
    return "I apologize, but our AI service is experiencing high demand right now. I'll use my built-in knowledge to help you instead.";
  }
  
  if (error?.error?.type === 'invalid_api_key') {
    return "I'm having trouble accessing my AI capabilities due to an authentication issue. I'll use my built-in knowledge to help you instead.";
  }
  
  if (error?.error?.type === 'invalid_request_error') {
    return "I encountered an issue processing your request. I'll use my built-in knowledge to help you instead.";
  }
  
  return "Sorry, I'm having trouble connecting to my recommendation engine. Please try again later.";
};
