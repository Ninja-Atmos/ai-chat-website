import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ai-chat-website/', // Replace 'ai-chat-website' with your actual repository name
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
