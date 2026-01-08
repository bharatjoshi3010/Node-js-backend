//npm init
//npm i express
//npm i mongoose
//npm i bcrypt jsonwebtoken
//npm i cookie-parser
//npm i ejs

//setiing up the package imports
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

//setting up the DB models 
const userModel = require("./models/user");
const postModel = require("./models/post")

//setiing up the view engine
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//setting the parser so it can sent cookies properly
app.use(cookieParser());



app.get('/', (req,res) => {
    res.render("index");
});

//setting up the route for signup
app.post('/register', async(req,res) => {
    let {email, password, username, name, age} = req.body;

    let user = await userModel.findOne({email});
    if(user) return res.status(500).send("User Already Registered");     //if user with same email exist then it comes back from here and not create the new user

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                username,
                email, 
                age,
                name,
                password: hash
            });

            let token = jwt.sign({email: email, userid: user._id}, "shhhh");
            res.cookie("token", token);
            res.send("registered");
        })
    })
});

//setting up the route for signin
app.get("/login",(reqq, res) => {
    res.render("login");
})

app.post('/login', async(req,res) => {
    let {email, password} = req.body;
    let user = await userModel.findOne({email});
    if(!user) return res.status(500).send("Something went wrong");     //if user with this email do not exist then we will say "something went wrong "

    bcrypt .compare(password, user.password, function (err, result){
        if(result) {
            let token = jwt.sign({email: email, userid: user._id}, "shhhh");
            res.cookie("token", token);
            res.status(200).send("you can login");}
        else res.redirect("/login");
    })
});

app.get('/logout', (req, res) => {
    res.cookie("token", "");   //it means the cookie named token is now blank
    res.redirect("/login");
});

app.get("/profile", isLoggedIn, (req,res) => {    //so this is the profile route which opens only if the user is logged in otherwise it will send user to the login page (this work is possible through the middlewere we make -> isLoggedIn);

    console.log(req.user);   //reading the data coming from the middlewere
})

//making a middlewere for protected routes

function isLoggedIn(req, res, next){                    //we can apply this middlewere to the routes so that it can check that, is user is logged in or not, if not then it will not open that route or redirect him to the login or register route.(thats why it is called protected route)
    if(req.cookies.token === "") res.send("you must be logged in. ");
    else{
                             //token           //secret key        
        let data = jwt.verify(req.cookies.token, "shhhh"); // it will convert the jwt token's data to the original object and again give it to the 'data' variable here.
        req.user = data;    //if logged in then we sent the data to the user , and we can access it in that route
    }
    next();
}


app.listen(3000);