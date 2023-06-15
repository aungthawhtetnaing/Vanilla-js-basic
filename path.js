const path=require('path');

//last path
console.log(path.basename('/path/to/filename.png'));
console.log(path.dirname('/path/to/'));
console.log(path.extname('filename.png'));

const obj={
    base:"/path/to",
    file:'filename.png'
}
// console.log(path.format(obj));
// console.log(path.parse(path.basename('/path/to/filename.png')));
console.log(__dirname);
console.log(process.cwd());
console.log(__filename);

const dir='/path/to/';
const filename='filename.png';
console.log(path.join(__dirname,'.env'));