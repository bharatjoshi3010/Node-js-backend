const express = require("express");
const router = express.Router();
//we comment out these because we do not want these to be here now, because we imported the other functions
// const userModel = require("../models/user-model"); 
// const bcrypt = require("bcrypt");
// // const jwt = require("jsonwebtoken");   //no need because we are importing generateToken function
// const { generateToken } = require("../utils/generateToken");

const { registerUser, loginUser, logout } = require('../controllers/authController');

router.get("/", function (req, res) {
    res.send("hey users, its working");
});


//the acutal route is localhost:3000/users/register  -> till the 'users' we are already handling in separations from there we are working here.
router.post("/register", registerUser); //this registerUser, we created it in the authController so from there it is taking all the values

router.post("/login", loginUser);//this loginUser, we created it in the authController so from there it is taking all the values

router.get("/logout", logout);

module.exports = router;