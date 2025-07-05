# BharatShop AI - Personalized E-Commerce Recommendation Assistant

An AI-powered recommendation assistant for Indian D2C food and fashion brands that delivers hyper-personalized product suggestions based on user context and preferences.

## Features

- **Natural Language Understanding**: Extracts key preferences (dietary needs, style preferences, budget) from natural language queries
- **Personalized Recommendations**: Matches products to user profiles using hybrid filtering approaches
- **Explained Recommendations**: Provides clear, brand-aligned reasoning for product suggestions
- **Indian Market Context**: Considers local pricing (₹), seasonal trends, and cultural preferences
- **Rich Product Visuals**: Integrates product images from multiple sources with intelligent fallback system
- **Multi-source Product Data**: Fetches real-time product data from multiple e-commerce platforms (Amazon, Flipkart, Myntra, BigBasket)

## Sample Queries

- "Vegan snacks under ₹300"
- "Light ethnic wear for summer"
- "Protein-rich breakfast options"
- "Trendy casual wear under ₹1000"

## Tech Stack

- React with TypeScript
- Material UI for responsive design
- Context API for state management
- Framer Motion for animations
- Google Gemini 2.0 for intelligent recommendations
- Axios for API requests
- Multiple e-commerce platform integrations

## Setup Instructions

1. Clone this repository
2. Create a `.env` file in the root directory with your API keys:
   ```
   # Google Gemini API Configuration
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
   
   # Product API keys
   REACT_APP_AMAZON_API_KEY=your_amazon_api_key_here
   REACT_APP_FLIPKART_API_KEY=your_flipkart_api_key_here
   REACT_APP_MYNTRA_API_KEY=your_myntra_api_key_here
   REACT_APP_BIGBASKET_API_KEY=your_bigbasket_api_key_here
   ```
3. Run `npm install` to install dependencies
4. Run `npm start` to start the development server
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Project Structure

- `/src/components` - UI components
- `/src/context` - React Context for state management
- `/src/utils` - Utility functions including recommendation engine, image utilities, and API error handling
- `/src/services` - External API services (Gemini, product APIs)
- `/src/data` - Mock product data (used as fallback)
- `/src/types` - TypeScript interfaces
- `/public/images/products` - SVG product images (used as fallback)

## Error Handling

The application implements robust error handling for the Gemini API:

- **Rate Limit Handling**: When Gemini API rate limits are exceeded (HTTP 429), the app gracefully falls back to the local recommendation engine
- **Missing API Key**: Detects missing API keys and displays a notification to the user
- **Invalid Requests**: Handles various API error types with user-friendly messages
- **Global Error Event System**: Uses a custom event system to propagate API errors to the UI components

All error conditions maintain a smooth user experience by falling back to the local recommendation engine.

## Deployment

This project can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

```bash
npm run build
```
