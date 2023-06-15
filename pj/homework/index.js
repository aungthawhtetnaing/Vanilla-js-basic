const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer(async (req, res) => {
  if (req.url === '/data') {
    if (req.method === 'POST') {
      let body = '';

      req.on('data', (chunk) => {
        console.log(chunk);
        body += chunk;
      });

      req.on('end', async () => {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;

        try {
          const data = JSON.parse(body);
          console.log(data);
          const base64=data.image.split(';base64,')[1];
          const ext=data.image.split(';base64,')[0].split('/')[1];
          fs.writeFile(
            path.join
            (__dirname,
              new Date().getSeconds()+'.'+ext
              ),
              base64,'base64',
              (err,data)=>{
                if (err) {
                  console.log(err);
                  return
                }
                console.log(data);
              }
              )

          const oldData = await readFile();
          if (oldData !== null) {
            const id = oldData[oldData.length - 1].id + 1;
            data.id = id;
            const result = await writeFile([...oldData, data]);
            if (result) {
              res.end(JSON.stringify(data));
            }
          } else {
            data.id = 1;
            const result = await writeFile([data]);
            if (result) {
              res.end(JSON.stringify(data));
            }
          }
        } catch (error) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
      });
    }else if (req.method === 'DELETE') {
      const idMatch = req.url.match(/\/data\/([0-9]+)/);
      if (idMatch) {
        const id = parseInt(idMatch[1]);
        const data = await readFile();
        const filteredData = data.filter((item) => item.id !== id);
        const result = await writeFile(filteredData);
        if (result) {
          res.statusCode = 200;
          res.end(JSON.stringify({ message: 'Data deleted successfully' }));
        }
      }}
  }
});

const readFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, 'data.txt'), 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      if (data.length === 0) {
        resolve(null);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

const writeFile = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(__dirname, 'data.txt'), JSON.stringify(data), 'utf8', (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(true);
    });
  });
};




server.listen(6666, () => {
  console.log('Server is running on port 4444');
});



