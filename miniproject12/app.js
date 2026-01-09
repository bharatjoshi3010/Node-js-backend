//npm init
//npm i express         (for making the routes)
//npm i mongoose        (for connecting mongoDB server and the nodejs.)
//npm i bcrypt jsonwebtoken (for creating the session tokens so that we can make cookies of the session)
//npm i cookie-parser (for transfering cookies from one to another route)
//npm i ejs (for rendering the ejs view )
//npm i multer (for storing the files)

//setiing up the package imports
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const path = require('path'); //paackage of node no need to install.

//setting up the DB models 
const userModel = require("./models/user");
const postModel = require("./models/post")

const multerConfig = require("./config/multerConfig");

//setiing up the view engine
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//setting up path for the express static files
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, "public")));

//setting the parser so it can sent cookies properly
app.use(cookieParser());

app.get('/', (req,res) => {
    res.render("index");
});

//setting up the route for signup
app.post('/register', async(req,res) => {
    let {email, password, username, name, age} = req.body;

    let user = await userModel.findOne({email});
    if(user) return res.status(500).send("User Already Registered");     //if user with same email exist then it comes back from here and not create the new user

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                username,
                email, 
                age,
                name,
                password: hash
            });

            let token = jwt.sign({email: email, userid: user._id}, "shhhh");
            res.cookie("token", token);
            res.send("registered");
        })
    })
});

//setting up the route for signin
app.get("/login",(req, res) => {
    res.render("login");
})

app.post('/login', async(req,res) => {
    let {email, password} = req.body;
    let user = await userModel.findOne({email});
    if(!user) return res.status(500).send("Something went wrong");     //if user with this email do not exist then we will say "something went wrong "

    bcrypt .compare(password, user.password, function (err, result){
        if(result) {
            let token = jwt.sign({email: email, userid: user._id}, "shhhh");
            res.cookie("token", token);
            res.status(200).redirect("/profile");}
        else res.redirect("/login");
    })
});

app.get('/logout', (req, res) => {
    res.cookie("token", "");   //it means the cookie named token is now blank
    res.redirect("/login");
});

app.get("/profile", isLoggedIn, async(req,res) => {    //so this is the profile route which opens only if the user is logged in otherwise it will send user to the login page (this work is possible through the middlewere we make -> isLoggedIn);
    console.log(req.user);   //reading the data coming from the middlewere

    let user = await userModel.findOne({email: req.user.email}).populate("post"); //we are saying that populate the post filed

    res.render("profile", {user});
    //we sent the user to the profile page
})

//post route for creating the posts
app.post("/post", isLoggedIn, async(req,res) => {    //we can post only if we are logged in that's why here we put loggedIn protected (middlewere)
    let user = await userModel.findOne({email: req.user.email})  //tells which user is logged in
    let {content} = req.body; //it takes the value from the form and give content -> textarea here.

    //creating the post through post model
    let post = await postModel.create({       //post knows that user created the post
        user: user._id,
        content: content  
    })

    user.post.push(post._id); //tells the user that he created a post(interting the post id in users posts array)
    await user.save();    //we changed the things manually so, we have to save it
    res.redirect("/profile")
    //we sent the user to the profile page
})

//making the like route
app.get("/like/:id", isLoggedIn, async(req,res) => {    //so this is the like route which works only if the user is logged in otherwise it will send user to the login page (this work is possible through the middlewere we make -> isLoggedIn);

    let post = await postModel.findOne({_id: req.params.id}).populate("user");

    if(post.likes.indexOf(req.user.userid) === -1){             //index of returns -1 if, it do not find the value inside the paranthesis in the array(element not present)
        post.likes.push(req.user.userid);   //in posts like filed we added this users id, so we know who liked the post
    }
    else//if user already liked it
        {
          post.likes.splice(post.likes.indexOf(req.user.userid), 1);    //we removed the users cont from the like array of the post(user unliked the post)  
    }
    
    await post.save();    //we changed the values inside post so we saved it every time whether we liked or unliked
    res.redirect("/profile");
    //we sent the user to the profile page
})

//making the edit route
app.get("/edit/:id", isLoggedIn, async(req,res) => {    //so this is the edit route which works only if the user is logged in otherwise it will send user to the login page (this work is possible through the middlewere we make -> isLoggedIn);

    let post = await postModel.findOne({_id: req.params.id}).populate("user");    //finding the post and storing its detail on post variable
    res.render("edit", {post});     //giving this details to edit.ejs page
})

//making update route for saving the changes in the edit page
app.post("/update/:id", isLoggedIn, async (req, res) => {
    let post = await postModel.findOneAndUpdate({_id: req.params.id},{content : req.body.content});
    res.redirect("/profile");
})

//making a test page 
app.get("/test", (req, res)=>{
    res.render("test");
});

//profile pic upload 
app.get("/profile/upload", (req,res)=>{
    res.render("profileupload");
});
app.post("/upload",isLoggedIn, multerConfig.single("image"), async (req, res) => {
    console.log(req.file);
    let user = await userModel.findOne({email: req.user.email})
    //the text data of the form is stored inside the req.body 
    //and the details about the file is stored inside the req.file.
    //you can see the uploaded file on the folder which you provided as a destination on the multer.diskstorage
    user.profilepic = req.file.filename;
    await user.save();
    res.redirect("/profile");
});



//making a middlewere for protected routes
function isLoggedIn(req, res, next){                    //we can apply this middlewere to the routes so that it can check that, is user is logged in or not, if not then it will not open that route or redirect him to the login or register route.(thats why it is called protected route)
    if(req.cookies.token === "") res.redirect("/login");
    else{
                             //token           //secret key        
        let data = jwt.verify(req.cookies.token, "shhhh"); // it will convert the jwt token's data to the original object and again give it to the 'data' variable here.
        req.user = data;   //if logged in then we sent the data to the user , and we can access it in that route
        next();
    }
    
}


app.listen(3000);