const express = require('express')
const app = express()

app.get("/", function(req, res, next){
    res.send("Habibi I am the home page.")
})

app.get("/errorWalaPage", function(req, res, next){
    return next(new Error("this page is not implemented yet"));
});

app.use((err, req, res, next)=>{
    console.log(err.stack)
    res.status(500).send("Somthing bad happend, even worse then you")
});

app.listen(3000)
