//npm i express mongoose
//npm i cookie-parser
//npm i ejs
// npm i jsonwebtoken bcrypt dotenv cookie-parser
// npm i multer

const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");



//because we now did the separation of concerns so we have to require these things so that it runs while we run app.js
const db = require("./config/mongoose-connection");

//requiring the routers
const ownersRouter = require("./routes/ownersRoute");
const usersRouter = require("./routes/usersRoute");
const productsRouter = require("./routes/productsRoute");
const indexRouter = require("./routes/index");


require("dotenv").config();    //from this line we can use the variables which we setted inside the .env 

app.use(express.json());           
app.use(express.urlencoded({extended: true}));   //for data passing b/w url
app.use(cookieParser());   //for cookie parsing

app.use(
    expressSession({
        resave: false,      //donot save again and again if there is no change
        saveUninitialized: false,   //is a user come without login dont create session for him
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
)    //we need express session for using the 'flash'
app.use(flash());

app.use(express.static(path.join(__dirname, "public")));     //providing the location for different directories
app.set("view engine", "ejs");    //setting up the view engine


//the routes belonging to these Routers and go there
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/", indexRouter);   //home route


app.listen(3000);