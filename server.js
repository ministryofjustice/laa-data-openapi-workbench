import http from 'node:http';
import { promises as fsp } from 'node:fs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const PORT = Number(process.env.PORT ?? 8080);
const ROOT = path.resolve(process.env.WEB_ROOT ?? path.join(__dirname, 'public'));

const MIME = Object.freeze({
    '.html': 'text/html; charset=utf-8',
    '.js':   'application/javascript; charset=utf-8',
    '.css':  'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.yaml': 'application/yaml; charset=utf-8',
    '.yml':  'application/yaml; charset=utf-8',
    '.svg':  'image/svg+xml',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif':  'image/gif',
    '.txt':  'text/plain; charset=utf-8'
});

const send = (res, status, body, headers = {}) => {
    res.writeHead(status, { 'Cache-Control': 'no-cache', ...headers });
    res.end(body);
};

const notFound = (res) =>
    send(res, 404, '404 Not Found', { 'Content-Type': 'text/plain; charset=utf-8' });

const serverError = (res, err) =>
    send(
        res,
        500,
        (process.env.NODE_ENV === 'production' ? '500 Server Error' : `500 Server Error\n${err?.stack}`),
        { 'Content-Type': 'text/plain; charset=utf-8' }
    );

const streamFile = async (res, filePath, status = 200) => {
    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] ?? 'application/octet-stream';
    const stream = fs.createReadStream(filePath);
    stream.on('open', () => {
        res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
    });
    stream.on('error', (err) => serverError(res, err));
    stream.pipe(res);
};

const resolvePath = async (urlPath) => {
    let fp = path.join(ROOT, urlPath === '/' ? 'index.html' : urlPath);
    try {
        const stat = await fsp.stat(fp);
        if (stat.isDirectory()) {
            fp = path.join(fp, 'index.html');
            await fsp.access(fp); // throws if missing
        }
        return fp;
    } catch {
        return null;
    }
};

const handler = async (req, res) => {
    try {
        const url = new URL(req.url, 'http://localhost');
        const urlPath = decodeURIComponent(url.pathname);
        const reqExt = path.extname(urlPath).toLowerCase();

        const filePath = await resolvePath(urlPath);
        if (filePath) return streamFile(res, filePath);

        // SPA fallback ONLY for extensionless "page" routes
        if (!reqExt) {
            const fallback = path.join(ROOT, 'index.html');
            try {
                await fsp.access(fallback);
                return streamFile(res, fallback);
            } catch {
                return notFound(res);
            }
        }

        // Assets like .yaml/.yml should 404 (not return index.html)
        return notFound(res);
    } catch (err) {
        return serverError(res, err);
    }
};


http.createServer(handler).listen(PORT, '0.0.0.0', () => {
    console.log(`Static server bound to 0.0.0.0 (accessible via http://localhost:${PORT})`);
    console.log(`Serving from: ${ROOT}`);
});
