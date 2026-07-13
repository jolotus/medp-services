import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import settings from '../data/settings.json';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async context => {
  const posts = await getCollection('blog');
  return rss({
    title: `${settings.branding.brandName} — Blog & guides`,
    description: settings.siteDescription,
    site: context.site || 'https://medp-services.netlify.app',
    items: posts.sort((a,b) => +b.data.pubDate - +a.data.pubDate).map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.slug}/`,
      customData: `<language>fr</language>`,
    })),
  });
};
