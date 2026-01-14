const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedin");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", function (req, res){
    let error = req.flash("error"); //
    // we get form the flash msg fucntionalitie (we are coming here from some other route, with that flash(we can access that flash here also));
    
    res.render("index", { error, loggedin: false }); //we sending that error to the index page.
});



router.get("/shop", isloggedin, async function(req, res){
    let product = await productModel.find();
    let success = req.flash("success");
    res.render("shop", {products : product, success});
});

router.get("/cart", isloggedin, async function(req, res){
    let user = await userModel.findOne({email: req.user.email}).populate("cart");

    let price = 0;
    let discount = 0;
    let shipping = 0;

    user.cart.forEach(item => {
        price = price + Number(item.price);
        shipping = shipping + 20;
        discount = discount + Number(item.discount) ;
    });

    const bill = price-discount+shipping;

    res.render("cart", {user, bill});

    console.log(user.cart);
});

router.get("/addtocart/:productid", isloggedin, async function(req, res){
    let user = await userModel.findOne({ email: req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "Added to cart");
    res.redirect("/shop");

});



module.exports = router;