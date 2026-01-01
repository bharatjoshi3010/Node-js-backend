const http = require('http');
const server = http.createServer(function(req, res){
    res.end("hello world");
})

server.listen(3000);

//After running this script go to the browser and search (localhost:3000)
