//npm init
//npm i express
//npm i mongoose

const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//it also works same
// app.get('/', function(req, res){
//     res.send("hey");
// })

app.get('/', (req, res) => {
    res.render("index");            //it is rendering index.ejs
})

app.get('/read', async(req, res) => {
    let allusers = await userModel.find();
    res.render("read", {users: allusers});            //it is rendering index.ejs
})

app.post('/create', async (req, res) => {
    console.log("inside create route")
    let {name, email, image} = req.body;    //destructuring from req.body

    let createdUser = await userModel.create({
        name,                    //its the destructuring sortcut name : name -> can be written as name only
        email,
        image
    });

    res.redirect("/read");

})

app.get('/delete/:id', async(req, res) => {
    let allusers = await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect("/read");           //it is rendering index.ejs
})
app.get('/edit/:id', async(req, res) => {
    let users = await userModel.findOne({_id : req.params.id});
    res.render("edit", {users});           //it is rendering index.ejs
})

app.post('/update/:id', async (req, res) => {
    console.log("inside update route")
    // userModel.findOneUpdate(findone, update, {new: true}); //syntax of update (this new true helps to give the new created user)

    let updateduser = await userModel.findOneAndUpdate({_id : req.params.id}, {name: req.body.name, email:req.body.email, image:req.body.image}, {new: true});
    //it changes updates the name to the "bharat joshiii" for the user whos username is "bharat"


    res.redirect("/read");

})

app.listen(3000);