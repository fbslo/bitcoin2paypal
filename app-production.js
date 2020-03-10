var express =  require("express");
var app = express();
var bodyParser = require("body-parser");
const https = require('https');
var sanitizer = require('sanitize')();
const RateLimit = require('express-rate-limit');
var sqlinjection = require('sql-injection');

//connect to MySQL
var con = require("./scripts/config.js")

// Variables for https and http
var port_http = 80 //port for http
var port_https = 443 //port for https

//get functions from file
const functions = require('./scripts/functions.js')

//stop smaller DoS attacks b limiting each IP
const limiter = new RateLimit({
  windowMs: 15*60*1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  delayMs: 0 // disable delaying — full speed until the max limit is  reached
});

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


//show contact page
app.get('/contact', (req, res) => {
	res.render('contact', {
		query: req.query //check if message was sent from query (?status=message_sent)
	})
});

//main landing page
app.use('/', require('./routes/index.js'));
//create new transaction
app.use('/create', require('./routes/create.js'));
//show details of each exchnage transaction
app.use('/exchange', require('./routes/exchange.js'));
///only for testing, remove in production
app.use('/test', require('./routes/test.js'));
//contact information
app.use('/contact_submit', require('./routes/contact.js'));
//admin panel
app.use('/admin', require('./routes/admin.js'));
//blog posts
app.use('/blog', require('./routes/blog.js'));
//terms and conditions & privacy policy
app.use('/legal', require('./routes/legal.js'));
//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
  res.status(404).render('errors/404');
});



// we will pass our 'app' to 'https' server
https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
    //passphrase: 'password'
}, app)
.listen(port_https);

// Redirect from http port 80 to https
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(port_http);

//const PORT = process.env.PORT || 5000;
//start application, only for developement
//app.listen(PORT, console.log(`Server started on port ${PORT}`));
