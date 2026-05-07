import { defineConfig } from 'vite';

export default defineConfig({
  envPrefix: 'NEXT_PUBLIC_',
  logLevel: 'info',
  plugins: [],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  clearScreen: false,
  server: {
    host: '0.0.0.0',
    port: 4000,
    hmr: {
      overlay: false,
    },
  },
});
