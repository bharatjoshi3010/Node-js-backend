const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owners-model");

console.log(process.env.NODE_ENV);     
//it will tell the name of the environment, and if environment it not selected then it will return undefined
//To set it write :
//export NODE_ENV=development  (for mac, it setup the development environment)
//$env:NODE_ENV="development" (for window powershell, it setup the development environment)
//set NODE_ENV=development  (for window cmd, it setup the development environment)

if(process.env.NODE_ENV === "development"){
    //here we want that this create route only works in the 'development environment' so at first we check are we in the development env or not then go to the create route.
    router.post("/create", async function (req, res) {
        let owners = await ownerModel.find();
        if(owners.length > 0) {     //we want that we only have one owner so if we have more then one owner then say we can't make new owners
            return res
            .status(503)
            .send("You don't have permission to create a new ownner");
        }

        let {fullname, email, password} = req.body;  //data coming from the frontend (or the ejs file of the create , basically from the form)
        
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
            //we will fill the remaining details later
        })

        //we created a owner and sent its details to the postman.
        res.status(201).send(createdOwner);
    });
}                               


router.get("/admin", function(req, res){
    let success = req.flash("success");
    console.log(success);
    res.render("createproducts", { success});
});

module.exports = router;