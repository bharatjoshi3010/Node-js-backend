const mongoose = require('mongoose');

mongoose
.connect("mongodb://127.0.0.1:27017/watches")
//it will connect with the local mongodb server but once we deploy it it will fail , so need to change it
.then(function(){
    console.log("connected");
})
.catch(function(err){
    console.log(err);
})

module.exports = mongoose.connection;
//exporting mongoose connection so that you can require it


//know you can see that all the files are concern about their work only, like this one is only for connectiong the database --> So we achived separtion of concerns