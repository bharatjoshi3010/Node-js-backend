const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/mongopractice`);

const userSchema = mongoose.Schema({
    name : String,
    username : String,
    email: String
})


//We want to do CRUD opreation in any route, so for that we have to export the route first

module.exports = mongoose.model("user", userSchema);
// export is a propertie not a method