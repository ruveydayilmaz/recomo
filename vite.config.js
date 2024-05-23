// PACKAGES
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// CSS
import postcss from './postcss.config.js';

export default defineConfig({
  // CSS configuration
  css: {
    postcss,
  },

  // Vite plugins
  plugins: [react()],

  // Module resolution configuration
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        },
      },
    ],
  },

  // Build configuration
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  // Development server configuration
  server: {
    proxy: {
      // Proxy configuration for API requests
      '/api': {
        target: 'https://api.themoviedb.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // Proxy configuration for image requests
      '/img': {
        target: 'https://image.tmdb.org/t/p/original',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/img/, ''),
      },
    },
  },
});
