//npm i express mongoose
//npm i cookie-parser
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const path = require("path");

//because we now did the separation of concerns so we have to require these things so that it runs while we run app.js
const db = require("./config/mongoose-connection");

//requiring the routers
const ownersRouter = require("./routes/ownersRoute");
const usersRouter = require("./routes/usersRoute");
const productsRouter = require("./routes/productsRoute");

app.use(express.json());           
app.use(express.urlencoded({extended: true}));   //for data passing b/w url
app.use(cookieParser());   //for cookie parsing
app.use(express.static(path.join(__dirname, "public")));     //providing the location for different directories
app.set("view engine", "ejs");    //setting up the view engine


//the routes belonging to these Routers and go there
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);


app.listen(3000);