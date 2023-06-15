const { readFile, writeFile } = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url.match(/\/data\/([0-9]+)/) && req.method === 'PUT') {
    const id = parseInt(req.url.split('/')[2], 10);

    let body = '';

    req.on('data', (chunk) => {
      console.log(chunk);
      body += chunk;
    });

    req.on('end', () => {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      // var data=JSON.parse(body);
      // const oldData=JSON.parse(await readFile());
      // if(oldData !== null){
      //   id=oldData[oldData.length-1].id+1;
      //   data.id=id;
      //   const result=await writeFile([
      //     ...oldData,
      //     data
      //   ]);if(result){
      //     res.end(JSON.stringify(data))
      //   }
      // }else{
      //   data.id=1;
      //   const result=await writeFile([data]);
      //   if(result){
      //     res.end(JSON.stringify(data))
      //   }
      // }

      try {
        const data = JSON.parse(body);
        console.log(data);

        res.end(JSON.stringify({ message: 'Data updated successfully' }));
      } catch (error) {
        res.statusCode = 400; // Bad Request
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  }
});

server.listen(4444, () => {
  console.log('Server is running on port 4444');
});



