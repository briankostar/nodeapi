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
//instance of the express router
var router = express.Router();

//test route
router.get('/', function(req, res){
    res.json({message: "yes! this works!"});
});

//REGISTER OUR ROUTES
//First endpoint of our api will be .... /api
app.use('/api', router);

//start the app
app.listen(port);
console.log("Here comes the magic on " + 8080);
