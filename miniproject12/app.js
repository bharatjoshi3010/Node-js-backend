//npm init
//npm i express
//npm i mongoose
//npm i bcrypt jsonwebtoken
//npm i cookie-parser
//npm i ejs

const express = require('express');
const app = express();
const userModel = require("./models/user");
const cookieParser = require('cookie-parser');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


app.get('/', (req,res) => {
    res.render("index");
});

app.listen(3000);