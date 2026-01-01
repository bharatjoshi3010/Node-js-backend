const fs = require('node:fs');

// fs.rmdir("./deleteMe" ,function(err){    //delete the given directory (if empty)
// fs.rmdir("./deleteMe" ,{recursive: true} ,function(err){       //delete the directory no matter what's inside 
fs.rm("./deleteMe" , {recursive: true},function(err){     //delete the directory no matter what's inside 
    if(err) console.error(err); 
    else console.log("removed");
})