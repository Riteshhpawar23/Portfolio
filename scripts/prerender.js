// Puts the finished page into dist/index.html, so the text shows before any JavaScript runs.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { render } from '../.ssr/entry-server.js';

const file = new URL('../dist/index.html', import.meta.url);
const fonts = readdirSync(new URL('../dist/assets/', import.meta.url))
  .filter((name) => /^(instrument-serif-latin-400-normal|geist-latin-wght-normal).*\.woff2$/.test(name))
  .map((name) => `<link rel="preload" href="/Portfolio/assets/${name}" as="font" type="font/woff2" crossorigin />`)
  .join('');

const html = readFileSync(file, 'utf8')
  .replace('<!--app-->', () => render())
  .replace('</head>', `${fonts}</head>`);

writeFileSync(file, html);
console.log('prerendered dist/index.html');
