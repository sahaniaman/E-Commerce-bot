// This file logs environment variable status at build time
// It doesn't expose actual values, just presence/absence

const envVariables = {
  REACT_APP_OPENAI_API_KEY: process.env.REACT_APP_OPENAI_API_KEY ? 'Set' : 'Not Set',
  REACT_APP_OPENAI_MODEL: process.env.REACT_APP_OPENAI_MODEL || 'Not Set',
  REACT_APP_GEMINI_API_KEY: process.env.REACT_APP_GEMINI_API_KEY ? 'Set' : 'Not Set',
  NODE_ENV: process.env.NODE_ENV || 'Not Set'
};

console.log('==== Environment Variables Status ====');
console.log(JSON.stringify(envVariables, null, 2));
console.log('=====================================');

// Don't expose sensitive values
export default {
  OPENAI_API_KEY_SET: !!process.env.REACT_APP_OPENAI_API_KEY,
  OPENAI_MODEL: process.env.REACT_APP_OPENAI_MODEL || 'gpt-3.5-turbo',
  GEMINI_API_KEY_SET: !!process.env.REACT_APP_GEMINI_API_KEY,
  GEMINI_API_KEY: process.env.REACT_APP_GEMINI_API_KEY || '',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development'
};
