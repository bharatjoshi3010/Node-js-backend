const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");


module.exports.registerUser = async function (req, res) {
    try {
        let { email, fullname, password } = req.body;
        //like we have more then these field for a user, but if we do not provide anyone of them(or if there is some issue in these three also) still mongoDB donot give any error and make the user(because mongoDB is schema less), which can make problems later
        //so we can use 'JOY' for validation

        //checking if there any email exist or not with the same name :
        let user = await userModel.findOne({ email: email });
        if (user) {
            req.flash("error", "You are already a user,  please login");
            //flash msg this is a new thing
            //we created this flash msg in anothor route and then we sent it to the "/" route, so we can assecc this msg in "/" route also
            return res.redirect("/");
        }


        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return req.send(err.message);
                else {
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname           //if i forget to destructure anything and then use it here then it will crash the app but try catch help us to handle these type of crashes.
                    })
                    let token = generateToken(user);  //it will create the cookie for the user which we just created.
                    res.cookie("token", token);  //setting the token once signin
                    res.render("shop");
                }
            });
        });

    } catch (err) {
        res.send(err.message);
    }

};

module.exports.loginUser = async function (req, res) {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    //checking if there is a user with this type of email or not.
    //if not then give a error
    if (!user) {
        req.flash("error", "Something went wrong");
        //flash msg this is a new thing
        //we created this flash msg in anothor route and then we sent it to the "/" route, so we can assecc this msg in "/" route also
        return res.redirect("/");
    }
    //and if there is really a user with that email...
    else {
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                let token = generateToken(user);
                res.cookie("token", token);
                res.render("shop");
            }
            else {
                req.flash("error", "Something went wrong");
                //flash msg this is a new thing
                //we created this flash msg in anothor route and then we sent it to the "/" route, so we can assecc this msg in "/" route also
                return res.redirect("/");
            }
        });
    }
};

module.exports.logout = async function (req, res) {
    res.cookie("token", "");
    res.redirect('/');
};