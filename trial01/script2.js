const fs = require('node:fs');

fs.appendFile("hey.txt", "all good here, what about u", function(err){
    if(err) console.log(err);
    else console.log("done");  
})