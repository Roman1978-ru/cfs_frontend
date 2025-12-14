import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import check from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
      tsconfigPaths(),
      check({ typescript: true }),
  ],
  build: {
    target: 'es2021',
    cssTarget: 'chrome96',
  },
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://89.23.102.60:5000',
        changeOrigin: true,
      }
    }
  }
});
