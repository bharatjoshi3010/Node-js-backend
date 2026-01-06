//npm init
//npm i ejs
//npm i express
//npm i cookieparser
//npm i moongose
//npm i jsonwebtoken bcrypt

const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');  //we need it for using the cookie sent by one route to another
const bcrypt = require('bcrypt'); //used for the password encryption
const jwt = require('jsonwebtoken');  //for making the session token

//requiring userModel
const userModel = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


app.get("/", (req, res) => {
    res.render("index");
});

app.post("/create", (req, res) => {
    let { username, email, password, age } = req.body; //destructuring of body and extracting these things from there

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let creatdUser = await userModel.create({
                username,
                email,
                password: hash,  //now the password is secured as a hash
                age
            })

            let token = jwt.sign({email}, "shhhhhhhhhh");
            res.cookie("token", token);

            res.send(creatdUser);
        })
    })
});

app.get("/login", function(req,res){
    res.render('login');
});

app.post("/login", async function(req, res){
    let user = await userModel.findOne({email: req.body.email}); //it will return null if there is no user with this email
    if(!user) return res.send("something is wrong");  //if no user found then stop here.

    bcrypt.compare(req.body.password, user.password, function(err, result){
        if(result){
            
            let token = jwt.sign({email : user.email}, "shhhhhhhhhh");
            res.cookie("token", token);
            res.send("yes you can login");
        }
        else res.send("something is wrong");
        
    })
});

app.get("/logout", function(req, res){
    res.cookie("token", "");    //by this the token value vanished
    res.redirect("/");
})

app.listen(3000);