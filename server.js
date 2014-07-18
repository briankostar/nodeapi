//BASE SETUP

//call the packages we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//configure app to use bodyparser
//bodyparser let us get the data from a POST
app.use(bodyParser());

var port = process.env.PORT || 8080;

//connect to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://kostar:d*3la1ba9DEe*#@ds027509.mongolab.com:27519/mongokostar');

var Panda = require('./app/models/panda');

//ROUTES for our API
//instance of the express router. we can make multiple instances to handel authentication, api, etc
var router = express.Router();

//route middleware that occurs for all request
router.use(function(req, res, next){
    console.log(req.method, req.url);
    //continue doing what we were doing
    next();
});

router.route('/pandas')
.post(function(req, res){
    //make instance of Panda model
    var panda = new Panda();
    panda.name = req.body.name;

    panda.save(function(err){
	if(err)
	    res.send(err);
	res.json({message: 'Panda created'});
    });
})
.get(function(req, res) {
    Panda.find(function(err, pandas) {
	if (err)
	    res.send(err);

	res.json(pandas);
	});
});

router.route('/pandas/:panda_id')

// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
.get(function(req, res) {
    Panda.findById(req.params.panda_id, function(err, panda) {
	if (err)
	    res.send(err);
	res.json(panda);
	});
    })
// update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
.put(function(req, res) {

    // use our bear model to find the bear we want
    Panda.findById(req.params.panda_id, function(err, panda) {

	if (err)
	    res.send(err);

	panda.name = req.body.name; // update the bears info

	// save the bear
	panda.save(function(err) {
	    if (err)
		res.send(err);

	    res.json({ message: 'Panda updated!' });
	    });

	});
    })
// delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
.delete(function(req, res) {
    Panda.remove({
	_id: req.params.panda_id
	}, function(err, panda) {
	    if (err)
		res.send(err);

	    res.json({ message: 'Successfully deleted' + req.params.panda_id });
	    });
    });

app.use('/api', router);

//start the app
app.listen(port);
console.log("Here comes the magic on " + 8080);
