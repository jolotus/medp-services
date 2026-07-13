import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import AstroPWA from '@vite-pwa/astro';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://medp-services.netlify.app',
  integrations: [
    tailwind(),
    sitemap({ filter: (page) => !['/404/', '/offline/', '/merci/', '/success/'].some(path => page.endsWith(path)) }),
    AstroPWA({
      registerType: 'prompt',
      manifest: false, // manifeste dynamique généré par Astro
      workbox: { navigateFallback: '/offline', navigateFallbackDenylist: [/^\/admin/, /^\/.netlify/] },
      devOptions: { enabled: false },
    }),
  ],
  output: 'static',
});
