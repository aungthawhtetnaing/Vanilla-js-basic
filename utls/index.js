const fs=require('fs');
const path = require('path');
//read
fs.readFile('./text.txt','utf8',(data,err)=>{
    if (err) {
        console.log(err);
        return;
    }
    console.log(data);
});

//write
fs.writeFile(
    path.join(__dirname,'/new1.txt'),
    'Write File dd',
    'utf8',
    (err)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log('Successfully write file');
    }
)
// console.log('okokkkkk');

//append
fs.appendFile(
    path.join(__dirname,'/new1.txt'),
    'append File\n',
    { encoding: "latin1", mode: 0o666, flag: "a" },
    (err)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log('append Successfully write file');
    }
)
// console.log('okokkkkk');
//delete
if (fs.existsSync(path.join(__dirname,'/newText.txt'))) {
    fs.unlink(
        path.join(__dirname,'/newText.txt'),
        (err)=>{
            if(err){
                console.log(err);
                return;
            }
            console.log('Successfully delete file');
        }
    )
}

//read
fs.watchFile(
    path.join(__dirname,'/new1.txt'),
    (ev,filename)=>{
       console.log('======');
       console.log(ev);
       console.log(filename);
    }
)

