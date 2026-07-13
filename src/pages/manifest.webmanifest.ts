import type { APIRoute } from 'astro';
import settings from '../data/settings.json';

export const GET: APIRoute = () => {
  const theme = settings.theme?.primaryColor || '#002B5C';
  return new Response(JSON.stringify({
    name: settings.siteTitle,
    short_name: settings.branding?.brandName || 'MEDP Services',
    description: settings.siteDescription,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: settings.theme?.creamColor || '#F5F5F0',
    theme_color: theme,
    lang: 'fr',
    categories: ['business', 'productivity', 'utilities'],
    icons: [72, 96, 128, 144, 152, 192, 384, 512].map(size => ({
      src: `/assets/icon-${size}x${size}.png`, sizes: `${size}x${size}`, type: 'image/png', purpose: 'any maskable'
    })),
    screenshots: [
      { src: '/assets/screenshot-wide.webp', sizes: '1280x720', type: 'image/webp', form_factor: 'wide' },
      { src: '/assets/screenshot-narrow.webp', sizes: '390x844', type: 'image/webp', form_factor: 'narrow' }
    ],
    shortcuts: [
      { name: 'Nos Services', url: '/services', icons: [{ src: '/assets/icon-96x96.png', sizes: '96x96' }] },
      { name: 'Simulateur', url: '/simulateur', icons: [{ src: '/assets/icon-96x96.png', sizes: '96x96' }] },
      { name: 'Contact', url: '/contact', icons: [{ src: '/assets/icon-96x96.png', sizes: '96x96' }] }
    ]
  }), { headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' } });
};
