var express =  require("express");
var app = express();
var bodyParser = require("body-parser");
const https = require('https');
var sanitizer = require('sanitize')();
const RateLimit = require('express-rate-limit');
var sqlinjection = require('sql-injection');

//connect to MySQL
var con = require("./scripts/config.js")

//get functions from file
const functions = require('./scripts/functions.js')

//stop smaller DoS attacks b limiting each IP
const limiter = new RateLimit({
  windowMs: 15*60*1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  delayMs: 0 // disable delaying — full speed until the max limit is  reached
});

app.use(require('sanitize').middleware);
//create express connection and serve static files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('images'));
app.use(express.static('dest'));
app.set('view engine', 'ejs');
app.use(bodyParser.json()); // for parsing application/json
// apply to all requests
app.use(limiter);
//prevent SLQ injections, but its blocking POST forms from working
//app.use(sqlinjection);

var database_table = 

//show contact page
app.get('/', (req, res) => {
	res.render('admin', {
		query: database_table //check if message was sent from query (?status=message_sent)
	})
});

app.get('*', function(req, res){
  res.status(404).render('errors/404');
});


const PORT = process.env.PORT || 5000;
//start application
app.listen(PORT, console.log(`Server started on port ${PORT}`));
