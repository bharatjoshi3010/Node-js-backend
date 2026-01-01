const fs = require('node:fs');

fs.unlink("hihi.txt", function(err){    
    //delete the given file
    if(err) console.error(err); 
    else console.log("Deleted");
})