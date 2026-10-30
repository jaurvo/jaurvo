/**
 * Manual prerenderer for the Jaurvo site.
 *
 * Renders every public route in headless Chrome and saves the resulting
 * HTML, so crawlers and link unfurlers get full content (high SEO) without
 * needing Angular's built-in prerender pipeline.
 *
 * Usage: npm run prerender
 *   (runs `ng build --configuration production` first, then this script)
 *
 * Chrome discovery: set CHROME_PATH, or put Chrome/Chromium on PATH.
 * Windows default install locations are checked automatically.
 */
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(root, 'dist', 'jaur-studio-site', 'browser');

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
};

function findChrome() {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  const candidates = [
    // Windows
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
    // macOS
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    // Linux
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ];
  for (const c of candidates) {
    if (c && existsSync(c)) return c;
  }
  return 'chrome'; // hope it is on PATH
}

function routeToFile(route) {
  // '' -> index.html, 'services' -> services/index.html
  const parts = route.split('/').filter(Boolean);
  return join(distDir, ...parts, 'index.html');
}

async function main() {
  if (!existsSync(join(distDir, 'index.html'))) {
    console.error('dist not found. Run `ng build --configuration production` first.');
    process.exit(1);
  }

  // Collect routes: static pages + every SEO service page from the data file.
  const dataSrc = await readFile(
    join(root, 'src', 'app', 'core', 'service-pages.data.ts'),
    'utf8'
  );
  const slugs = [...new Set([...dataSrc.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]))];
  const routes = ['', 'services', 'work', 'about', 'contact', 'privacy', 'terms',
    ...slugs.map((s) => `services/${s}`)];
  console.log(`Prerendering ${routes.length} routes...`);

  // Tiny static server with SPA fallback (index.html for unknown paths).
  const server = createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      let file = join(distDir, urlPath);
      if (urlPath.endsWith('/')) file = join(file, 'index.html');
      if (!existsSync(file)) file = join(distDir, 'index.html'); // SPA fallback
      const body = await readFile(file);
      res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(500);
      res.end('error');
    }
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;

  const chrome = findChrome();
  console.log('Chrome:', chrome);
  let ok = 0;
  for (const route of routes) {
    const url = `http://127.0.0.1:${port}/${route}`;
    const outFile = routeToFile(route);
    try {
      const { stdout } = await execFileAsync(
        chrome,
        [
          '--headless=new',
          '--disable-gpu',
          '--no-sandbox',
          '--hide-scrollbars',
          '--window-size=1366,900',
          '--virtual-time-budget=12000',
          '--dump-dom',
          url,
        ],
        { maxBuffer: 64 * 1024 * 1024, timeout: 60000 }
      );
      await mkdir(dirname(outFile), { recursive: true });
      await writeFile(outFile, stdout);
      ok++;
      if (ok % 20 === 0) console.log(`  ${ok}/${routes.length}...`);
    } catch (err) {
      console.error(`FAILED ${route}:`, err.message.split('\n')[0]);
    }
  }
  server.close();
  console.log(`Done: ${ok}/${routes.length} pages prerendered into dist.`);
  if (ok < routes.length) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
