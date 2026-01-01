const fs = require('node:fs');

fs.copyFile("hello.txt", "./copy/copy.txt", function(err){    
    //copy the txt file to the given destination
    if(err) console.error(err); 
    else console.log("done");
})