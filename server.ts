import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { createProxy } from 'http-proxy';
import cookie from 'cookie';

const SESSION_HEADER_KEY = 'X-Auth-Session-Id';

function parseSessionCookie(cookie: string | undefined): [string, string] {
  if (!cookie) {
    return ['', ''];
  }
  return decodeURIComponent(cookie).split(':') as [string, string];
}

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const proxy = createProxy({
  target: 'http://backend:8080/ws',
  ignorePath: true,
  secure: false,
  ws: true,
});

proxy.on('proxyReq', (proxyReq, req) => {
  const c = cookie.parse(req.headers.cookie?.toString() || '');
  if (c.nosebook_session) {
    const [sessionId] = parseSessionCookie(c.nosebook_session);
    proxyReq.setHeader(SESSION_HEADER_KEY, sessionId);
    proxyReq.removeHeader('cookie');
  }
});

proxy.on('proxyReqWs', (proxyReq, req) => {
  const c = cookie.parse(req.headers.cookie?.toString() || '');
  if (c.nosebook_session) {
    const [sessionId] = parseSessionCookie(c.nosebook_session);
    proxyReq.setHeader(SESSION_HEADER_KEY, sessionId);
    proxyReq.removeHeader('cookie');
  }
});

const server = createServer((req, res) => {
  const parsedUrl = parse(req.url!, true);
  if (req.url?.includes('/connect/ws')) {
    proxy.web(req, res);
    return;
  }

  handle(req, res, parsedUrl);
});

app.prepare().then(() => {
  server.listen(port);
  server.on('upgrade', function(req, socket, head) {
    if (req.url?.includes('/connect/ws')) {
      proxy.ws(req, socket, head);
    }
  });

  console.log(
    `> Server listening at http://localhost:${port} as ${dev ? "development" : process.env.NODE_ENV
    }`,
  );
});

