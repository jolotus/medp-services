import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import AstroPWA from '@vite-pwa/astro';

export default defineConfig({
  site: 'https://medp-services.netlify.app',
  integrations: [
    react(),
    tailwind(),
    AstroPWA({
      registerType: 'prompt',
      manifest: false, // use our own public/manifest.json
      devOptions: { enabled: true },
    }),
  ],
  output: 'static',
});
