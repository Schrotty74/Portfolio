#!/usr/bin/env node
// Read-only checks for the current static portfolio and release mappings.
import { readFileSync, existsSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
const read = p => readFileSync(p, 'utf8');
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const object = (source, pattern, label) => {
  const match = source.match(pattern);
  if (!match) { failures.push(`Missing mapping: ${label}`); return {}; }
  try { return runInNewContext(`(${match[1]})`, Object.create(null), { timeout: 1000 }); }
  catch { failures.push(`Invalid mapping: ${label}`); return {}; }
};
const homes = { en: read('index.html'), de: read('de/index.html') };
const mappings = Object.fromEntries(Object.entries(homes).map(([lang, html]) => [lang, object(html, /repoBySlug=(\{[^}]*\})/, `${lang} home`)]));
const staticNames = object(read('assets/static-app.js'), /const names=(\{[^}]*\})/, 'static-app');
const syncNames = object(read('scripts/sync-static-releases.cjs'), /const slugs=(\{[^}]*\})/, 'release sync');
const status = JSON.parse(read('release-status.json'));
const workflow = read('.github/workflows/refresh-release-status.yml');
const repositories = workflow.match(/const repositories = \[([\s\S]*?)\];/);
check(!!repositories, 'Missing release workflow repository list');
const repoNames = new Set(Array.from((repositories?.[1] || '').matchAll(/"([^"]+)"/g), m => m[1]));
const collections = new Set(Array.from(homes.en.matchAll(/<a href="\/Portfolio\/apps\/([^/]+)\/index\.html" class="app-card"[\s\S]*?<div class="card-topline"><span>([^<]+)<\/span>[\s\S]*?<\/a>/g)).filter(m => m[2] === 'Collection').map(m => m[1]));
const cards = {};
for (const [lang, html] of Object.entries(homes)) {
  const prefix = lang === 'de' ? '/Portfolio/de/apps/' : '/Portfolio/apps/';
  cards[lang] = Array.from(html.matchAll(/<a href="([^" ]+)" class="app-card"/g), m => m[1]).filter(h => h.startsWith(prefix)).map(h => h.slice(prefix.length).replace(/\/index\.html$/, ''));
  check(new Set(cards[lang]).size === cards[lang].length, `Duplicate ${lang} cards`);
  check(cards[lang].length > 0, `No ${lang} project cards found`);
  check(Object.keys(mappings[lang]).length === cards[lang].length, `${lang} card and repository mapping counts differ`);
  for (const slug of cards[lang]) {
    const repo = mappings[lang][slug];
    check(!!repo, `Missing ${lang} home mapping: ${slug}`);
    check(repo === mappings.en[slug], `Conflicting home mapping: ${lang}/${slug}`);
    check(repoNames.has(repo), `Missing release workflow repository: ${slug}`);
    check(Object.hasOwn(status, repo), `Missing release status: ${slug}`);
    if (!collections.has(slug)) {
      check(staticNames[slug] === repo, `Missing or inconsistent static-app mapping: ${slug}`);
      check(syncNames[repo] === slug, `Missing or inconsistent release sync mapping: ${slug}`);
    }
    const file = `${lang === 'de' ? 'de/' : ''}apps/${slug}/index.html`;
    if (!existsSync(file)) { failures.push(`Missing ${lang} page: ${slug}`); continue; }
    const page = read(file);
    check(page.includes(`lang="${lang}"`), `Missing language: ${file}`);
    for (const asset of ['styles.css', 'dark-theme.css', 'light-theme.css', 'color-theme.css', 'static-app.js']) check(page.includes(`assets/${asset}`), `Missing ${asset}: ${file}`);
    check(page.includes('detail-shell'), `Missing detail shell: ${file}`);
    check(page.includes('data-motion-toggle'), `Missing motion control: ${file}`);
    const other = `${lang === 'de' ? '' : 'de/'}apps/${slug}`;
    check(page.includes(`/Portfolio/${other}`), `Missing language counterpart link: ${file}`);
  }
}
check([...cards.en].sort().join('|') === [...cards.de].sort().join('|'), 'English and German project cards differ');
for (const slug of Object.keys(staticNames)) check(cards.en.includes(slug), `Static-app mapping has no card: ${slug}`);
for (const [repo, slug] of Object.entries(syncNames)) check(mappings.en[slug] === repo, `Release sync mapping has no matching card: ${repo}`);
if (failures.length) { console.error('Portfolio validation FAILED:\n' + failures.map(f => ` - ${f}`).join('\n')); process.exitCode = 1; }
else console.log(`Portfolio validation OK: ${cards.en.length} project/collection cards and ${cards.en.length * 2} localized pages; release mappings checked.`);
