const { default: mongoose } = require('mongoose');
mongoose.set('strictQuery', false);  //for removing a warning
mongoose.connect(`mongodb://127.0.0.1:27017/authtestapp`);

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    age: Number
});

module.exports = mongoose.model("user", userSchema);
//from here we export the user model and we can require it in app.js