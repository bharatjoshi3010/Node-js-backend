const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedin");

router.get("/", function (req, res){
    let error = req.flash("error"); //
    // we get form the flash msg fucntionalitie (we are coming here from some other route, with that flash(we can access that flash here also));
    
    res.render("index", { error }); //we sending that error to the index page.
});

router.get("/shop", isloggedin, function(req, res){
    res.render("shop");
});



module.exports = router;