const express = require('express');
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");

app.get("/", (req, res) => {
    res.send("hello");
})

app.get("/create", async function (req, res){ 
    let user = await userModel.create({
        username: "harsh",
        age: 25,
        email: "harsh@gmail.com"
    })
    res.send(user);
})

app.get("/post/create", async function (req, res){ 
    let post = await postModel.create({
        postdata: "hello kaise ho sab bhai log",          //we created this post
        user: "695e18468943da432713f8e5"                    //its the objectId of user, who makes this post.
    })

    let user = await userModel.findOne({_id: "695e18468943da432713f8e5"});   //we get the user of this id in 'user' variable
    user.posts.push(post._id); //in that user's posts array we pushed the id of above post
    await user.save(); //we changed it manually so we have to save it now
    res.send({post, user})
;})

app.listen(3000);


//kul milkae isme hamare pass ek user model hai jo users ko handle kar raha hai or ek post model hai jo post ko mangae kar raha hai or jab bhi ham koi post banate hai to wo post model mai hi banti hai par uske sath ek id bhi associate hoti hai jo ki uss user ki id hai jisne uss post ko banaya, or user ke documnet mai bhi ye wali post ki id save ho jati hai, to jab bhi ham user ki post check karte hai to uske uske post array mai jo bhi post id hoti hai, wahi post hamko dikhayi deti hai
