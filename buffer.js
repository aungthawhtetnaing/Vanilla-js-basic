const {Buffer}=require('buffer');

// const buff=new Buffer('Hello World','utf8');
// console.log(buff);
//strng to buffer
const buff=Buffer.from('Hello World','utf8');
// console.log(buff);

//buffer to string
const newBuff=Buffer.alloc(11);
newBuff.write('Hello World');
console.log(newBuff);
console.log(newBuff.toString('base64'));