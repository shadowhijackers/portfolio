import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      dts: false,
      remotes: {
        header: {
          type: 'module',
          name: 'header',
          entry: 'http://localhost:5001/remoteEntry.js',
          entryGlobalName: 'header',
          shareScope: 'default',
        },
        about: {
          type: 'module',
          name: 'about',
          entry: 'http://localhost:5002/remoteEntry.js',
          entryGlobalName: 'about',
          shareScope: 'default',
        },
        experience: {
          type: 'module',
          name: 'experience',
          entry: 'http://localhost:5005/remoteEntry.js',
          entryGlobalName: 'experience',
          shareScope: 'default',
        },
        projects: {
          type: 'module',
          name: 'projects',
          entry: 'http://localhost:5003/remoteEntry.js',
          entryGlobalName: 'projects',
          shareScope: 'default',
        },
        contact: {
          type: 'module',
          name: 'contact',
          entry: 'http://localhost:5004/remoteEntry.js',
          entryGlobalName: 'contact',
          shareScope: 'default',
        },
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
  server: {
    port: 5173,
    strictPort: true,
    origin: 'http://localhost:5173',
  },
  preview: {
    port: 5173,
    strictPort: true,
  },
  build: {
    target: 'chrome89',
  },
});
