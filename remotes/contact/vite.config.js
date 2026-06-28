import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'contact',
      dts: false,
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.jsx',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
  server: {
    port: 5004,
    strictPort: true,
    origin: 'http://localhost:5004',
  },
  preview: {
    port: 5004,
    strictPort: true,
  },
  build: {
    target: 'chrome89',
  },
});
