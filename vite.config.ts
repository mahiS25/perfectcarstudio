import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/booking': {
        target: 'https://script.google.com',
        changeOrigin: true,
        rewrite: () => '/macros/s/AKfycbwhr-FIYpAWhYCg_rMoI_uGSUiNyaSql2cdhGPIm1_LV9829BeRiAXDOI8c_8t-O6qGOA/exec',
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
