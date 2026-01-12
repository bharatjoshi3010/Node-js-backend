//npm i mongoose
//npm i debug
//npm i config

const mongoose = require('mongoose');
const config = require("config");


const dbgr = require("debug")("development:mongoose");
//we call it while making it, which tells from which namespace it is coming from.
//("development:mongoose")  -> it tells that its a development phase and the msg coming from the mongoose db

//why to use debugr when we have console.log -->
/*
console.log() -> prints on everyons terminal while we share the code,
but dbgr shows only those logs which are setted according to their env, so it keeps the console clean
*/

mongoose
// .connect("mongodb://127.0.0.1:27017/watches")
//it will connect with the local mongodb server but once we deploy it it will fail , so need to change it
.connect(`${config.get("MONGODB_URI")}/watches`)
//so now we are getting the url from the separate file which makes it more secure and follows university standards
//and this config.get gets the value according to the env variable if its dev environment then it gets the value from development field or it its production then it gets the value from production env
//for development environment it will find -> development.json
//& for production environment it will find -> production.json
.then(function(){
    dbgr("connected");
    // to use this dbgr, you have to set environment variable first so that it can work 
    //so on console write 
    //set DEBUG=development:*  (for windows cmd)
    //$env:DEBUG="development:*"  (for windows powershell)
    //export DEBUG=development:*   (for mac)
    //so it will help you showing all the messages created for -> ("development:------")
    //after this you can see the debug msgs
    //if you run --> set DEBUG=  ,then it will again remove the messages
})
.catch(function(err){
    console.log(err);
})

module.exports = mongoose.connection;
//exporting mongoose connection so that you can require it

//know you can see that all the files are concern about their work only, like this one is only for connectiong the database --> So we achived separtion of concerns