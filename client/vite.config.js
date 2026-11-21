import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redirige /api/* → http://localhost:5000/api/*
      '/api': 'http://localhost:5000',
    },
  },
});
