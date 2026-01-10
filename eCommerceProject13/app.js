//npm i express mongoose
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const path = require("path");

app.use(express.json());           
app.use(express.urlencoded({extended: true}));   //for data passing b/w url
app.use(cookieParser());   //for cookie parsing
app.use(express.static(path.join(__dirname, "public")));     //providing the location for different directories
app.set("view engine", "ejs");    //setting up the view engine

app.get("/", (req, res) => {
    res.send("hey");
});

app.listen(3000);