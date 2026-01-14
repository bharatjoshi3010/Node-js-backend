const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname:{
        type: String,
        minLength: 3,
        trim: true,
    },
    email: String,
    password: String,
    //cart is a array which stores 'productsId'
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",           //these are the id of product schema
    },
],
    orders: {
        type: Array,
        default: [],
    },
    contact: Number,
    picture: String,
});

module.exports = mongoose.model("user", userSchema);