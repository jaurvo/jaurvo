import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(root, 'dist', 'jaur-studio-site', 'browser');

async function main() {
  const server = createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      console.log('REQ:', urlPath);
      let file = join(distDir, urlPath);
      if (urlPath.endsWith('/')) file = join(file, 'index.html');
      if (!existsSync(file)) file = join(distDir, 'index.html');
      console.log('SERVING:', file, existsSync(file) ? 'EXISTS' : 'MISSING');
      const body = await readFile(file);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(body);
    } catch (e) {
      console.log('SERVER ERROR:', e.message);
      res.writeHead(500);
      res.end('error');
    }
  });

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  console.log('Server on port:', port);

  const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const url = `http://127.0.0.1:${port}/`;
  console.log('Testing URL:', url);

  try {
    const { stdout, stderr } = await execFileAsync(chrome,
      ['--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
       '--window-size=1366,900', '--virtual-time-budget=12000', '--dump-dom', url],
      { maxBuffer: 64 * 1024 * 1024, timeout: 60000 });
    console.log('SUCCESS! Output length:', stdout.length);
  } catch (err) {
    console.log('=== FULL ERROR ===');
    console.log('Message:', err.message);
    console.log('Code:', err.code);
    if (err.stderr) console.log('STDERR:', err.stderr.substring(0, 1000));
    console.log('=== END ===');
  }
  server.close();
}
main();
