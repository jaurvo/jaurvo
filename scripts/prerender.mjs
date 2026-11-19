/**
 * Manual prerenderer for the Jaurvo site.
 * Renders every public route in headless Chrome and saves the resulting HTML.
 * Usage: node scripts/prerender.mjs
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
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
};

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function routeToFile(route) {
  const parts = route.split('/').filter(Boolean);
  return join(distDir, ...parts, 'index.html');
}

async function main() {
  if (!existsSync(join(distDir, 'index.html'))) {
    console.error('dist not found. Run `ng build --configuration production` first.');
    process.exit(1);
  }

  const dataSrc = await readFile(
    join(root, 'src', 'app', 'core', 'service-pages.data.ts'),
    'utf8'
  );
  const slugs = [...new Set([...dataSrc.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]))];
  const routes = ['', 'services', 'work', 'about', 'contact', 'pricing', 'privacy', 'terms',
    ...slugs.map((s) => `services/${s}`)];
  console.log(`Prerendering ${routes.length} routes...`);

  const server = createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      let file = join(distDir, urlPath);
      if (urlPath.endsWith('/')) file = join(file, 'index.html');
      if (!existsSync(file)) file = join(distDir, 'index.html');
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
  console.log('Server on port:', port);
  console.log('Chrome:', CHROME);

  let ok = 0;
  const failed = [];

  for (const route of routes) {
    const url = `http://127.0.0.1:${port}/${route}`;
    const outFile = routeToFile(route);
    try {
      const { stdout } = await execFileAsync(
        CHROME,
        [
          '--headless=new',
          '--disable-gpu',
          '--no-sandbox',
          '--hide-scrollbars',
          '--window-size=1366,900',
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
      failed.push(route);
      if (failed.length <= 3) {
        console.error(`FAILED "${route}": ${err.message.split('\n')[0]}`);
      }
    }
  }

  server.close();
  console.log(`Done: ${ok}/${routes.length} pages prerendered into dist.`);
  if (failed.length > 0) {
    console.error(`Failed: ${failed.slice(0, 10).join(', ')}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('FATAL:', err);
  process.exit(1);
});
