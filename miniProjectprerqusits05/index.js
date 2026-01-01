 const express = require('express');
 const app = express();
 const path = require('path');         //requiring the path module

 //parser for form
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));

//  console.log(__dirname+'\public');  below  'path.join(__dirname, 'public')' is doing the same thing
 app.use(express.static(path.join(__dirname, 'public')));   //here we are saying that for all the requests you will get the static file in this folder

 //setting up ejs
 app.set('view engine', 'ejs');

 app.get("/", function(req, res){
    // res.send("Chal raha hai its all okay");
    res.render("index");
 });
 
 app.get("/profile/:username", function(req, res){    //it is a dynamic route, you can write anything in place of these (':xyz') ex : localhost3000/profile/bharat, so username = bharat
    res.send(`welcome, ${req.params.username}`) // for using that username value we will use req.params.username
 })

 app.get("/author/:username/:age", function(req, res){
    res.send(`welcome, ${req.params.username}, of age ${req.params.age}`)
 })

 app.listen(3000, function(){
    console.log("Its running ")
 })