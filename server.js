//BASE SETUP

//call the packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//configure app to use bodyparser
//bodyparser let us get the data from a POST
app.use(bodyParser());

var port = process.env.PORT || 8080;

//ROUTES for our API
//instance of the express router. we can make multiple instances to handel authentication, api, etc
var router = express.Router();

//route middleware that occurs for all request
app.use(function(req, res, next){
    console.log(req.method, req.url);
    //continue doing what we were doing
    next();
});

//param middleware to check 'name' parameter
router.param('name', function(req, res, next, name){
    //logic to check name validation
    if(name == "brian"){
	req.name = "you majestic beast";
    }else{
	req.name = name;
    }
    console.log('doing name validations on the parameter value : ' + name);
    next();
})

//test route
router.get('/', function(req, res){
    res.json({message: "yes! this works!"});
});
router.get('/test', function(req, res){
    res.json({message: "testing api!"});
});
router.get('/hello/:name', function(req,res){
    res.send('hello ' + req.name + '!');
});

//REGISTER OUR ROUTES
//First endpoint of our api will be .... /api
//this sets the ROOT router. /app /app/test
app.use('/', router);

app.route('/login').get(function(req, res){res.send('login form')});

//start the app
app.listen(port);
console.log("Here comes the magic on " + 8080);
