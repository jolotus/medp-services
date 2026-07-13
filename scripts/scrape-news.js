/**
 * 🤖 MEDP Services — Auto-scraping des actualités administratives
 * 
 * Ce script récupère les dernières actualités des sites officiels français,
 * les reformule en langage accessible, et génère des articles Markdown
 * prêts à être publiés dans le CMS.
 * 
 * Sources : service-public.fr, france-travail.fr, caf.fr, diplomatie.gouv.fr,
 * administration-etrangers-en-france.interieur.gouv.fr
 * 
 * Exécuté automatiquement via GitHub Actions tous les jours à 6h UTC.
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

const NEWS_DIR = path.join(__dirname, '..', 'src', 'content', 'news');

// Ensure directory exists
if (!fs.existsSync(NEWS_DIR)) {
  fs.mkdirSync(NEWS_DIR, { recursive: true });
}

const TODAY = new Date().toISOString().split('T')[0];

// Source configurations
const SOURCES = [
  {
    name: 'Service-Public.fr',
    url: 'https://www.service-public.fr/',
    selector: 'article, .sp-categorie__item, .sp-article__item',
    category: 'general',
    extract: ($, el) => {
      const title = $(el).find('h2, h3, .sp-title, .sp-article__title').first().text().trim();
      const link = $(el).find('a').first().attr('href');
      return title && link ? { title, url: link.startsWith('http') ? link : `https://www.service-public.fr${link}`, source: 'Service-Public.fr' } : null;
    }
  },
  {
    name: 'France Travail',
    url: 'https://www.francetravail.fr/',
    selector: 'article, .actus-liste article, .news-item',
    category: 'famille',
    extract: ($, el) => {
      const title = $(el).find('h2, h3, .titre, .title').first().text().trim();
      const link = $(el).find('a').first().attr('href');
      return title && link ? { title, url: link.startsWith('http') ? link : `https://www.francetravail.fr${link}`, source: 'France Travail' } : null;
    }
  },
  {
    name: 'CAF.fr',
    url: 'https://www.caf.fr/',
    selector: 'article, .actus-item, .news-item',
    category: 'famille',
    extract: ($, el) => {
      const title = $(el).find('h2, h3, .title').first().text().trim();
      const link = $(el).find('a').first().attr('href');
      return title && link ? { title, url: link.startsWith('http') ? link : `https://www.caf.fr${link}`, source: 'CAF' } : null;
    }
  },
  {
    name: 'Diplomatie.gouv.fr',
    url: 'https://www.diplomatie.gouv.fr/fr/conseils-aux-voyageurs/',
    selector: 'article, .item, .actualite',
    category: 'etrangers',
    extract: ($, el) => {
      const title = $(el).find('h2, h3, .title').first().text().trim();
      const link = $(el).find('a').first().attr('href');
      return title && link ? { title, url: link.startsWith('http') ? link : `https://www.diplomatie.gouv.fr${link}`, source: 'Diplomatie.gouv.fr' } : null;
    }
  },
];

// Fallback template generator when scraping fails or OpenAI is unavailable
function generateFromTemplate(item) {
  const templates = {
    'Service-Public.fr': `## Nouvelle information administrative

${item.title}

Cette mise à jour concerne les démarches administratives en France. Les usagers sont invités à consulter la source officielle pour les détails complets et les modalités d'application.

> **Source :** [${item.source}](${item.url})
> **Date :** ${TODAY}

### Conseil MEDP

Nous vous recommandons de vérifier régulièrement les informations officielles et de ne pas hésiter à nous contacter par WhatsApp pour un accompagnement personnalisé dans vos démarches.`,

    'France Travail': `## Actualité France Travail

${item.title}

Cette information est importante pour les demandeurs d'emploi et les bénéficiaires de prestations. Nous vous recommandons de prendre connaissance des détails sur le site officiel.

> **Source :** [${item.source}](${item.url})
> **Date :** ${TODAY}

### Comment MEDP peut vous aider

- **Actualisation mensuelle** : nous vous rappelons les échéances et vous accompagnons dans la démarche
- **Constitution de dossier** : nous vérifions que votre dossier est complet et conforme
- **Recours** : en cas de problème, nous rédigeons vos lettres de recours`,

    'CAF': `## Nouvelle information CAF / Allocations

${item.title}

Cette actualité concerne les prestations familiales et les aides au logement. Les allocataires sont invités à consulter leur espace personnel sur caf.fr.

> **Source :** [${item.source}](${item.url})
> **Date :** ${TODAY}

### Notre accompagnement CAF

Notre **Pack CAF & APL** à 29€ inclut la simulation d'éligibilité, le remplissage des formulaires et le suivi jusqu'au premier versement. Contactez-nous par WhatsApp pour en bénéficier.`,

    'Diplomatie.gouv.fr': `## Conseils aux voyageurs — Mise à jour

${item.title}

Cette information est destinée aux ressortissants étrangers et aux voyageurs se rendant en France ou à l'étranger. Consultez les recommandations officielles avant tout déplacement.

> **Source :** [${item.source}](${item.url})
> **Date :** ${TODAY}

### Besoin d'aide pour vos démarches consulaires ?

MPS accompagne les ressortissants camerounais en France pour leurs démarches de visa, passeport et titre de séjour. Contactez-nous par WhatsApp pour un devis personnalisé.`,
  };

  return templates[item.source] || templates['Service-Public.fr'];
}

// OpenAI reformulation (if API key available)
async function reformulateWithAI(item) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Tu es un rédacteur web spécialisé dans l'accompagnement administratif en France pour les étrangers et les personnes en difficulté. Tu reformules les actualités administratives en langage simple, clair et accessible. Tu ajoutes toujours une section "Conseil MEDP" qui oriente le lecteur vers nos services d'accompagnement. Réponds en markdown français.`
        },
        {
          role: 'user',
          content: `Titre de l'actualité : "${item.title}"
Source : ${item.source}
URL : ${item.url}
Date : ${TODAY}

Reformule cette actualité en un article de blog de 300-500 mots. Structure :
1. Un titre accrocheur (H2)
2. Un résumé clair de l'information
3. Ce que cela signifie concrètement pour les usagers
4. Les démarches à effectuer
5. Une section "Conseil MEDP" qui propose notre accompagnement (services à la personne, accompagnement administratif, titre de séjour, etc.) avec mention de WhatsApp +33 7 59 08 35 80
6. La source officielle en citation`
        }
      ],
      temperature: 0.7,
    }, {
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' }
    });

    return response.data.choices[0].message.content;
  } catch (err) {
    console.error('OpenAI reformulation failed:', err.message);
    return null;
  }
}

async function scrapeSource(source) {
  try {
    console.log(`🔍 Scraping ${source.name}...`);
    const response = await axios.get(source.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
      },
      timeout: 15000,
    });

    const $ = cheerio.load(response.data);
    const items = [];

    $(source.selector).each((_, el) => {
      const extracted = source.extract($, el);
      if (extracted && extracted.title.length > 10) {
        items.push(extracted);
      }
    });

    console.log(`✅ Found ${items.length} items from ${source.name}`);
    return items.slice(0, 3); // Max 3 per source per day
  } catch (err) {
    console.error(`❌ Failed to scrape ${source.name}:`, err.message);
    return [];
  }
}

async function main() {
  console.log('🚀 MEDP News Scraper started');
  console.log(`📅 Date: ${TODAY}`);
  
  let allItems = [];
  
  for (const source of SOURCES) {
    const items = await scrapeSource(source);
    allItems = allItems.concat(items);
    // Small delay between requests to be respectful
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log(`\n📊 Total items found: ${allItems.length}`);

  let generated = 0;
  for (const item of allItems) {
    // Check if already exists (by title hash)
    const slugTitle = item.title.toLowerCase().replace(/[^a-z0-9]/g, '-').substring(0, 50);
    const filename = `${TODAY}-${slugTitle}.md`;
    const filepath = path.join(NEWS_DIR, filename);

    if (fs.existsSync(filepath)) {
      console.log(`⏭️ Skipping (already exists): ${item.title.substring(0, 50)}...`);
      continue;
    }

    // Try AI reformulation first
    let content = await reformulateWithAI(item);
    
    // Fallback to template
    if (!content) {
      content = generateFromTemplate(item);
    }

    const frontmatter = `---
title: "${item.title.replace(/"/g, '\\"')}"
sourceUrl: "${item.url}"
pubDate: ${TODAY}
autoGenerated: true
validated: false
category: "${SOURCES.find(s => s.name === item.source)?.category || 'general'}"
---

${content}
`;

    fs.writeFileSync(filepath, frontmatter, 'utf-8');
    console.log(`✅ Generated: ${filename}`);
    generated++;
  }

  console.log(`\n🎉 Done! Generated ${generated} new articles.`);
  console.log('💡 Reminder: Review and validate articles in the CMS before publishing.');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
