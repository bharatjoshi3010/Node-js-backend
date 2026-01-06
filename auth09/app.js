// at first go to package.json and change the main:index.js to main:app.js
// then do  -> npm i jsonwebtoken bcrypt
// then do -> npm i express
// then do -> npm i cookie-parser (package for reading the cookie)


const cookieParser = require('cookie-parser');  //requiring cookie-parser for reading the cookies
const express = require('express');
const bcrypt = require('bcrypt');   //helps in encryption decryption 

const jwt = require('jsonwebtoken');    //helps in making the token/ cookies for the sessions

const app = express();

app.use(cookieParser());   //for reading the cookie

app.get("/", function (req,res){
    res.cookie("name", "Bharat"); //it helps to set a name cookie with value "bharat"
    //you can check the cookies of a website by installing "editThisCookie" chrome extension
//---------------------------------------------------------------------

    //for password encryption
    //this salt is a random string used for the encryption purpuses
    // bcrypt.genSalt(saltRounds, function(err, salt){
    //     bcrypt.hash(myPlaintextPassword, salt, function(err, hash){
    //         //Store hash in your password DB
    //     });
    // });
    //usually we use 10 saltrounds
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash("12102003", salt, function(err, hash){
            //your "myPlaintextPassword" is converted into the desired string
            //Store hash in your password DB
            console.log(hash); //it will give the hashed password here
        });
    });
    //12102003 's hash is -> $2b$10$a2xl3zawSNjmRWBzLUa5XOfNVC1RAqR3vnPZZWmViq4M9otaizrxi (we get it from console.log)
//-----------------------------------------------------------------------

    //comparing hash and the actual password (similar to decryption but here we just compare that the user's input password matches or not with the password he setted for himself)

    // bcrypt.compare("myplaintext","hash",function(err,result){
    //     console.log(result); //if hash and password matches it will return true otherwise it will return false
    // })

    bcrypt.compare("12102003","$2b$10$a2xl3zawSNjmRWBzLUa5XOfNVC1RAqR3vnPZZWmViq4M9otaizrxi",function(err,result){
        console.log(result); //if hash and password matches it will return true otherwise it will return false
    })

//-----------------------------------------------------------------------

    //making the session cookie
    //syntax ->
    //var token = jwt.sign({ foo:'bar' }, 'shhhhh');
    let token = jwt.sign({email: "bj20003@gamil.com"}, "secret");
    //this secret is the key for encryption so usually we keep it secretly in production grade apps
    console.log(token);  //so it gives us the token for the session (store it inside the cookie so you do not have to provide the login details for each task u do.)

    res.cookie("token", token); //we sent this cookie for the browser and it will work(attached) with all the routes from now
    res.send("Cookie seted");
})

app.get("/read", function(req, res){
    console.log(req.cookies);       //it gives the cookie coming from the another route.
    console.log(req.cookies.token);  //by this we can console only the token cookie 

//-> converting the cookie->token data to the actual data.

    let data = jwt.verify(req.cookies.token, "secret");
    console.log(data);

    res.send(data);
})

app.listen(3000);