const express = require("express");
const router = express.Router();

router.get("/", function(req, res){
    res.send("hey products, its working");
});

module.exports = router;