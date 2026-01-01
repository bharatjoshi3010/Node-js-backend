const fs = require('node:fs');

fs.rename("hey.txt", "hello.txt", function(err){    //changes the function name from hey to hello
    if(err) console.error(err); 
    else console.log("done");
})