const jwt = require("jsonwebtoken");
const ownerModel = require("../models/owners-model");

module.exports = async function (req, res, next) {
    if (!req.cookies.token) {
        req.flash("error", "you need to login as owner first");
        //flash msg this is a new thing
        //we created this flash msg in anothor route and then we sent it to the "/" route, so we can assecc this msg in "/" route also
        return res.redirect("/");
    }

    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);  //bring value from the token and give it to decoded
        let owner = await ownerModel
            .findOne({ email: decoded.email })
            .select("-password");//in complete data (it comes with password), so we removed the password from '-password'.
        //find the user by taking the help of the token
        if(owner){
            req.user = owner;     
            next();
        }
         else{
            req.flash("error", "login as owner first");
        res.redirect("/");
         }
    } catch (err) {
        req.flash("error", "something went wrong.");
        res.redirect("/");
    }
};