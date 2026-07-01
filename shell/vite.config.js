import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

const staticOrigin = process.env.AZURE_STATIC_URL?.replace(/\/$/, '');

const remoteEntry = (name, devPort) =>
  staticOrigin
    ? `${staticOrigin}/${name}/remoteEntry.js`
    : `http://localhost:${devPort}/remoteEntry.js`;

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
          entry: remoteEntry('header', 5001),
          entryGlobalName: 'header',
          shareScope: 'default',
        },
        about: {
          type: 'module',
          name: 'about',
          entry: remoteEntry('about', 5002),
          entryGlobalName: 'about',
          shareScope: 'default',
        },
        experience: {
          type: 'module',
          name: 'experience',
          entry: remoteEntry('experience', 5005),
          entryGlobalName: 'experience',
          shareScope: 'default',
        },
        projects: {
          type: 'module',
          name: 'projects',
          entry: remoteEntry('projects', 5003),
          entryGlobalName: 'projects',
          shareScope: 'default',
        },
        contact: {
          type: 'module',
          name: 'contact',
          entry: remoteEntry('contact', 5004),
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
