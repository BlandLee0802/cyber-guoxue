const { createServer } = require('node:http');
const { readFile, stat } = require('node:fs/promises');
const { join, extname } = require('node:path');

const PORT = 8080;
const DIR = 'C:\\Users\\Bland\\.openclaw-autoclaw\\workspace\\cyber-guoxue\\dist';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = createServer(async (req, res) => {
  let path = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  path = decodeURIComponent(path);
  
  const filePath = join(DIR, path);
  
  try {
    const s = await stat(filePath);
    if (s.isFile()) {
      const ext = extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      const buf = await readFile(filePath);
      res.end(buf);
      return;
    }
  } catch(e) {}
  
  try {
    const buf = await readFile(join(DIR, 'index.html'));
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(buf);
  } catch(e) {
    res.writeHead(500);
    res.end('Error');
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('Server running at http://127.0.0.1:' + PORT);
});
