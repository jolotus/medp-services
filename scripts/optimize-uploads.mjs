import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const directory = path.resolve('public/assets/uploads');
try { await fs.access(directory); } catch { process.exit(0); }
const files = await fs.readdir(directory);
for (const name of files) {
  const file = path.join(directory, name);
  const extension = path.extname(name).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(extension)) continue;
  const source = await fs.readFile(file);
  let pipeline = sharp(source, { failOn: 'none' }).rotate().resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true });
  if (extension === '.png') pipeline = pipeline.png({ compressionLevel: 9, palette: true });
  else if (extension === '.webp') pipeline = pipeline.webp({ quality: 82, effort: 5 });
  else pipeline = pipeline.jpeg({ quality: 84, progressive: true, mozjpeg: true });
  const output = await pipeline.toBuffer();
  if (output.length < source.length) await fs.writeFile(file, output);
}
console.log('✓ Médias CMS optimisés pour le build.');
