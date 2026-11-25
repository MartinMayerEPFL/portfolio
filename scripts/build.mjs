import { cp, mkdir, rm } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'dist');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of ['index.html', 'assets', 'Martin_Mayer_Portfolio.pdf', '.nojekyll']) {
  // Source archives are local inputs, not website downloads.
  await cp(resolve(root, file), resolve(output, file), { recursive: true, filter: source => !source.toLowerCase().endsWith('.zip') });
}
console.log('Site statique prêt dans dist/ — aucun service externe requis.');
