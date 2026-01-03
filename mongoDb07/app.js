// installed -> npm i express
// installed -> npm i mongoose
//we have two servers one for node and another for mongoDB, this mongoose help in messaging b/w nodes and mongodbs server 
//ORM - Object relational mapping
//ODM : object documnet mapping
const express = require('express');
const app = express();


const userModel = require('./usermodel'); 

app.get('/', (req, res)=>{
    res.send("hey");
})

app.get('/create', async (req, res) => {
    let createduser = await userModel.create({                      //its a asynchronous code   //by using this await we wait here to complete this create operation first 
        name : "Bharat",
        email: "bharat@gmail.com",
        username: "bharat"
    })
    res.send(createduser);
})

app.get('/update', async (req, res) => {
    
    // userModel.findOneUpdate(findone, update, {new: true}); //syntax of update (this new true helps to give the new created user)

    let updateduser = await userModel.findOneAndUpdate({username: "bharat"}, {name: "bharat joshiii"}, {new: true});
    //it changes updates the name to the "bharat joshiii" for the user whos username is "bharat"
    res.send(updateduser);


})

app.get("/read", async (req, res) => {
    let user = await userModel.find();  //read all the users
    //find always gives an array(whether there are many users or not even a single user)
    //userModel.findOne({username : "anjali"}); //it gives the user with this user name
    //but find one dp not return a array, it gives the object, if there are more then one user with this username then find one gives the first one only
    res.send(user);
})

app.get("/readOne", async (req, res) => {
    let user = await userModel.find({username : "anjali"});  //read only those users who's user name is anjali(give all the user with userName "anjali")
    res.send(user);
})

app.get("/delete", async (req, res) => {
    let user = await userModel.findOneAndDelete({username : "bharat"});  //delete the user having username as "bharat"
    //if more then one with this username then deletes the first one only
    res.send(user); //you have a last time access to that user after deleting the user
})

app.listen(3000);

//all the moongoose code which help in performing CRUD operation that is always a asyncronous code