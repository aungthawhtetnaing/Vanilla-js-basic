const http = require('http');
const fs = require('fs');
const path = require('path');

let counter = 0;
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

          const uniqueId = getNextUniqueId();
          fs.appendFile(
            path.join(__dirname, 'new1.txt'),
            JSON.stringify({ id: uniqueId, ...data }) + '\n',
            { encoding: 'utf8', flag: 'a' },
            (err) => {
              if (err) {
                console.log(err);
                return;
              }
              console.log('Successfully appended to file');
            }
          );

          res.end(JSON.stringify({ id: uniqueId, ...data }));
        } catch (error) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
      });
    } else if (req.method === 'GET') {
      fs.readFile(path.join(__dirname, 'new1.txt'), 'utf8', (err, data) => {
        if (err) {
          console.log(err);
          res.statusCode = 500; 
          res.end(JSON.stringify({ error: 'Failed to read data' }));
          return;
        }
        const lines = data.split('\n');
        const parsedData = lines
          .filter((line) => line.trim() !== '')
          .map((line) => JSON.parse(line));

        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(parsedData));
      });
    }
  }
});

server.listen(5555, () => {
  console.log('Server is running on port 5555');
});

function getNextUniqueId() {
  counter++;
  return counter;
}
