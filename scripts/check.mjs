import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { projects, translations } from '../assets/js/content.js';

const html = await readFile('index.html', 'utf8');
const css = await readFile('assets/styles.css', 'utf8');
const files = new Set();
for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  const path = match[1].split('#')[0];
  if (!/^(?:https?:|mailto:|tel:)/.test(path)) files.add(path);
}
for (const match of css.matchAll(/url\("([^"#]+)"\)/g)) files.add(`assets/${match[1]}`);
const ids = new Set();
for (const project of projects) {
  assert(!ids.has(project.id), `Identifiant de projet dupliqué : ${project.id}`);
  ids.add(project.id);
  assert(html.includes(`data-project="${project.id}"`), `Aperçu sans JavaScript manquant : ${project.id}`);
  if (project.document) {
    files.add(project.document.href);
    assert(project.document.fr && project.document.en, `Lien du document incomplet : ${project.id}`);
  } else assert(Number.isInteger(project.page) && project.page > 0, `Page du portfolio manquante : ${project.id}`);
  if (project.image) files.add(`assets/images/${project.image}.webp`);
  for (const image of project.gallery || []) files.add(`assets/images/${image.image}.${image.format || 'webp'}`);
  for (const video of project.videos || []) {
    files.add(`assets/media/${video.file}.mp4`);
    files.add(`assets/media/${video.file}.webp`);
    if (video.source) assert.equal(new URL(video.source).hostname, 'github.com', `Source vidéo GitHub invalide : ${video.file}`);
    for (const language of ['fr', 'en']) assert(video[language]?.title && video[language]?.caption, `Traduction vidéo manquante : ${video.file}.${language}`);
  }
  for (const language of ['fr', 'en']) {
    const copy = project[language];
    for (const field of ['title', 'category', 'subtitle', 'summary', 'role', 'context', 'introduction', 'metric', 'metricLabel']) assert(copy[field], `${project.id}.${language}.${field} manquant`);
    assert(copy.details.length > 0, `${project.id}.${language} : contributions manquantes`);
  }
  if (project.url) assert.equal(new URL(project.url).protocol, 'https:');
}
assert.deepEqual(Object.keys(translations.fr).sort(), Object.keys(translations.en).sort(), 'Traductions FR/EN incohérentes');
for (const match of html.matchAll(/data-i18n(?:-aria)?="([^"]+)"/g)) assert.equal(typeof translations.fr[match[1]], 'string', `Clé de traduction inconnue : ${match[1]}`);
for (const file of files) await access(resolve(file));
assert(!html.includes('href="/assets'), 'Les chemins doivent être relatifs pour GitHub Pages');
console.log(`${projects.length} projets, traductions FR/EN et ${files.size} fichiers locaux vérifiés.`);
