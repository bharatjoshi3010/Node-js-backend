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

app.listen(3000);