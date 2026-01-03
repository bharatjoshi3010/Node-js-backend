const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/mongopractice`);
// Connects to a local MongoDB database
// mongopractice is the database name
// If it doesn’t exist, MongoDB will create it automatically

// A schema defines the structure of documents in a collection
const userSchema = mongoose.Schema({
    name : String,
    username : String,
    email: String
})


//We want to do CRUD opreation in any route, so for that we have to export the model first

module.exports = mongoose.model("user", userSchema); //MongoDB will create a collection named "users" (plural, lowercase), makes it plural
// export is a propertie not a method