const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/data') {
    if (req.method === 'POST') {
      let body = '';

      req.on('data', (chunk) => {
        console.log(chunk);
        body += chunk;
      });

      req.on('end', () => {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        
        try {
          const data = JSON.parse(body);
          console.log(data);
          res.end(JSON.stringify(data));
        } catch (error) {
          res.statusCode = 400; // Bad Request
          res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
      });
    }
  }
});

server.listen(4444, () => {
  console.log("Server is running on port 4444");
});
