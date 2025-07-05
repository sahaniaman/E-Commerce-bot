# BharatShop AI - Personalized E-Commerce Recommendation Assistant

An AI-powered recommendation assistant for Indian D2C food and fashion brands that delivers hyper-personalized product suggestions based on user context and preferences.

## Features

- **Natural Language Understanding**: Extracts key preferences (dietary needs, style preferences, budget) from natural language queries
- **Personalized Recommendations**: Matches products to user profiles using hybrid filtering approaches
- **Explained Recommendations**: Provides clear, brand-aligned reasoning for product suggestions
- **Indian Market Context**: Considers local pricing (₹), seasonal trends, and cultural preferences

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

## Setup Instructions

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm start` to start the development server
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Project Structure

- `/src/components` - UI components
- `/src/context` - React Context for state management
- `/src/utils` - Utility functions including recommendation engine
- `/src/data` - Mock product data
- `/src/types` - TypeScript interfaces

## Deployment

This project can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

```bash
npm run build
