// vite.config.js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// 👇 vitest config
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.js'
  }
});
