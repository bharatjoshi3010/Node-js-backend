//instead of writing the whole code we created it separetly and from here we can export it and use whereever we want

const jwt = require("jsonwebtoken");

const generateToken = (user)=>{
    return jwt.sign({email: user.email, id: user._id}, process.env.JWT_KEY);
    //here we are giving this jwt _key as a secret variable beacuse it is to confidential.
}

module.exports.generateToken = generateToken; //its a named export
