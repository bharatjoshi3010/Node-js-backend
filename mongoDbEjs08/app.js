const express = require('express');
const app = express();
const path = require('path');

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

app.listen(3000);