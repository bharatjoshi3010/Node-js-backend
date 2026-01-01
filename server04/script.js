const express = require('express')    //requiring the express package
const app = express()           // after running this function all the power of the express goes inside the 'app' variable

//after doing this you can create routes(anything after the domain is called route (facebook.com/home/profile), this 'home/profile' is route)

app.use(function(req, res, next){              //this are the middlewere and they run before every route, we can make any number of routes, as much we want.
    console.log('hello i am the middlewere');
    next();                           //BY THIS we move to the next middlewer or the 'get ' whatever it is
});

app.use(function(req, res, next){                   //this is the second middle were
    console.log('hello i am the middlewere 2');
    next();
});

//app.get(route, requestHandler)
//request handler is a middlewere
app.get('/', function (req, res){
    res.send('Hello World the first route hello ')
});

app.get('/profile', function (req, res){
    res.send('Hello World, \n the profile route hello')
})

// app.listen(port)  //by doing you can search localhost:portNo. on a webbrowser and you will be redirected to here
//by writing localhost:3000/profile you will go to the second route
app.listen(3000)