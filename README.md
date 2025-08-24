# AI Chat Application

A modern React chat application with AI chat functionality. Currently configured with a mock AI service for immediate testing.

## Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run the Development Server:**
   ```bash
   npm run dev
   ```

3. **Open in Browser:**
   Navigate to `http://localhost:5173`

## Current Configuration

The app is currently using a **mock AI service** that provides realistic responses without requiring any external API keys. This allows you to test the chat functionality immediately.

### To Use Real AI (Optional):

If you want to use the real Perplexity AI API:

1. **Get a Perplexity API Key:**
   - Go to [Perplexity AI Settings](https://www.perplexity.ai/settings/api)
   - Sign up or log in to your account
   - Generate a new API key

2. **Configure Environment Variables:**
   - Create a `.env` file in the root directory
   - Add your API key:
   ```
   VITE_PERPLEXITY_API_KEY=your_actual_api_key_here
   ```

3. **Switch to Real API:**
   - In `src/App.tsx`, change the import from `mockApi` back to `perplexityApi`
   - Restart the development server

## Features

- Modern UI with Tailwind CSS
- Real-time chat with AI
- Particle background effects
- Responsive design
- Error handling
- Loading animations

## Troubleshooting

The app should work immediately with the mock AI service. If you encounter any issues:

1. Make sure all dependencies are installed: `npm install`
2. Check that the development server is running: `npm run dev`
3. Clear your browser cache and refresh the page

If you switch to the real Perplexity API and see "Failed to get response from AI" errors:
1. Make sure you have a valid Perplexity API key
2. Check that the `.env` file is in the root directory
3. Restart the development server after adding the API key
# AI Chat Website
