// const http=require('http');
// const server =http.createServer((req,res)=>{
//     res.setHeader('Content_Type','text/plane');
//     res.write('Hello world !Nodejs server');
//     res.end();
// })
// server.listen(3333,()=>
//     console.log("Sever is running on port 3333")
// )

const http=require('http');
// const server =http.createServer((req,res)=>{
//     res.statusCode=404;
//     res.setHeader('Content_Type','application/json');
//     res.setHeader('Authorization','Bearer dskdksmdnnssd')
//     res.write(JSON.stringify({name:'Hello world !Nodejs server'}));
//     res.end();
// })
// server.listen(3333,()=>
//     console.log("Sever is running on port 3333")
// )


const server =http.createServer((req,res)=>{
    res.statusCode=200;
    res.setHeader('Content_Type','text/html');
    res.setHeader('Authorization','Bearer dskdksmdnnssd')
    console.log(req.httpVersion);
    console.log(req.httpVersionMajor);
    console.log(req.httpVersionMinor);
    if (req.url==='/') {
        res.end('<h1>Hello World</h1>')
    }else if(req.url==='/about'){ 
        res.end('<h3>about</h3>')
    }else{
        res.statusCode=404;
        res.end('<h3>error</h3>')
    }
})
server.listen(3333,()=>
    console.log("Sever is running on port 3333")
)

