const express= require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended : true}));

app.use(express.static(path.join(__dirname, "public")));

app.get('/', function(req, res){
    fs.readdir(`./files`, function(err, files){
        console.log(files); //if there is no file inside this file folder then you will find a empty array in your console.
        //and if there are files then you will se a array of strings containing all the files names
        res.render("index", {files: files});
    })
})

app.get('/file/:filesName', function(req, res){
    fs.readFile(`./files/${req.params.filesName}`, "utf-8", function(err, filedata){ // if we do not mention utf-8 here then it reads data in hexaDecimal format(buffer), utf-8 makes this buffer data to english characters

        res.render ('show',{filename: req.params.filesName, filedata: filedata} )
    })
})

app.post('/create', function(req, res){                    //after clicking the submit button we come here and here it works create a file and write content on it.
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
        //then it goes back to the home route(/)
        //and '/' route re-render again and gives detail of the new file
        res.redirect("/")
    });
})

app.listen(3000)