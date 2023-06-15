const {URL}=require('url');

const exampleUrl='http://www.example.com/?query1=val1&query2=val2#bash';
// console.log(url.parse(exampleUrl).hostname);
console.log(new URL(exampleUrl));
console.log(new URLSearchParams(exampleUrl));