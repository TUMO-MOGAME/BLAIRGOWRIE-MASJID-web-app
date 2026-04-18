import sharp from 'sharp';
import { readdir, stat, unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, parse, dirname } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const dir = join(here, '..', 'public', 'pictures');
const MAX_WIDTH = 1920;
const QUALITY = 80;

const RENAMES = {
  'download (6).png': 'mosque-interior',
  'download (1).png': 'download-1',
  'download (2).png': 'download-2',
  'download (7).png': 'download-7',
  'download (15).png': 'download-15',
  'download (16).png': 'download-16',
  'download (17).png': 'download-17',
  'The History of Ramadan & Eid_D.jpg': 'ramadan-eid-history',
  'Understanding-Ramadan.jpg': 'understanding-ramadan',
};

const IN_USE = new Set([
  'placeview1.png',
  'placeview2.png',
  'home.png',
  'salah.png',
  'prospectus.png',
  'footer.png',
  'design1.png',
  'design2.png',
  'designtemplate1.png',
  'designtemplate2.png',
  'download (6).png',
  'The History of Ramadan & Eid_D.jpg',
]);

const entries = await readdir(dir);

let totalBefore = 0;
let totalAfter = 0;
const results = [];

for (const entry of entries) {
  if (!/\.(png|jpe?g)$/i.test(entry)) continue;
  if (!IN_USE.has(entry)) {
    console.log(`skip unused: ${entry}`);
    continue;
  }

  const src = join(dir, entry);
  const base = RENAMES[entry] ?? parse(entry).name;
  const out = join(dir, `${base}.webp`);

  const before = (await stat(src)).size;
  totalBefore += before;

  await sharp(src)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 5 })
    .toFile(out);

  const after = (await stat(out)).size;
  totalAfter += after;
  results.push({ entry, base: `${base}.webp`, before, after });
  console.log(`${entry} → ${base}.webp   ${fmt(before)} → ${fmt(after)}  (${pct(before, after)})`);
}

console.log('\n=== SUMMARY ===');
console.log(`total: ${fmt(totalBefore)} → ${fmt(totalAfter)}  (${pct(totalBefore, totalAfter)})`);

function fmt(b) {
  if (b > 1024 * 1024) return `${(b / 1024 / 1024).toFixed(2)} MB`;
  return `${(b / 1024).toFixed(0)} KB`;
}
function pct(before, after) {
  const saved = 100 - (after / before) * 100;
  return `-${saved.toFixed(1)}%`;
}
