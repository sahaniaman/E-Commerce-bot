// This file demonstrates how to use the OpenAI API in a standalone Node.js script

require('dotenv').config(); // Load environment variables from .env file

const { OpenAI } = require('openai');

async function main() {
  try {
    // Log environment variables (without exposing full key)
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY || 'Not set';
    console.log('API Key status:', apiKey ? `Key is set (starts with ${apiKey.substring(0, 4)}...)` : 'Key is NOT set');
    
    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: apiKey,
    });
    
    // Test API connection
    const response = await openai.chat.completions.create({
      model: process.env.REACT_APP_OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.'
        },
        {
          role: 'user',
          content: 'Hello, are you working correctly?'
        }
      ],
    });
    
    console.log('API Response:', response.choices[0]?.message?.content);
    console.log('API connection test: SUCCESS');
  } catch (error) {
    console.error('Error testing OpenAI API:', error);
  }
}

main();
