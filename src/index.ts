import {IncomingMessage, createServer} from 'node:http';

const readBody = (req: IncomingMessage): Promise<string> =>
  new Promise((resolve, reject) => {
    const body: unknown[] = [];

    req.on('data', chunk => body.push(chunk));
    req.on('end', () => resolve(body.join('')));
    req.on('error', () => reject(body.join('')));
  });

const server = createServer(async (req, res) => {
  const body = await readBody(req);
  const msg = {
    method: req.method,
    url: req.url,
    body,
  };

  res
    .writeHead(200, {
      'Content-Type': 'application/json',
    })
    .end(JSON.stringify(msg));
});

server.listen({host: '0.0.0.0', port: 3000}, () => {
  console.log('server listening on addr=http://0.0.0.0:3000');
});
