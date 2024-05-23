// PACKAGES
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// CSS
import tailwindConfig from './src/css/tailwind.config.js';

export default {
  plugins: [tailwind(tailwindConfig), autoprefixer],
}