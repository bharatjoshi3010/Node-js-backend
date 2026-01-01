const fs = require('node:fs');

fs.writeFile("hey.txt", "hi i am bharat", function(err){
    if(err) console.log(err);
    else console.log("done");
})