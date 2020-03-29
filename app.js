var express =  require("express");
var app = express();
var bodyParser = require("body-parser");
const https = require('https');
var sanitizer = require('sanitize')();
const RateLimit = require('express-rate-limit');
var basicAuth = require('express-basic-auth')
const fileUpload = require('express-fileupload');
const fs = require('fs');

//Get data from configuration file
let rawdata = fs.readFileSync('./config/config.json');
let config_json = JSON.parse(rawdata);
var password = config_json.password
var visit_limit = config_json.visit_limit
var env = config_json.environment

//connect to MySQL
var con = require("./scripts/config.js")

//get functions from file
const functions = require('./scripts/functions.js')

//get current version
functions.getLatestVerson()

//stop smaller DoS attacks b limiting each IP
const limiter = new RateLimit({
  windowMs: 15*60*1000, // 15 minutes
  max: visit_limit, // limit each IP to visit_limit requests per windowMs
  delayMs: 0 // disable delaying — full speed until the max limit is  reached
});

//remove header
app.disable('x-powered-by');
//file upload
app.use(fileUpload({
    limits: {
        fileSize: 5000000 //5mb limit
    },
    abortOnLimit: true
 }));
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

//show contact page
app.get('/contact', (req, res) => {
	res.render('contact', {
		query: req.query
	})
});

//main landing page
app.use('/', require('./routes/index.js'));
//create new transaction
app.use('/create', require('./routes/create.js'));
//show details of each exchnage transaction
app.use('/exchange', require('./routes/exchange.js'));
//POST contact information
app.use('/contact_submit', require('./routes/contact.js'));
//admin panel
app.use('/admin', basicAuth({
          users: { admin: password },
          challenge: true // <--- needed to actually show the login dialog!
      }), require('./routes/admin.js'));
//blog posts
app.use('/blog', require('./routes/blog.js'));
//terms and conditions & privacy policy
app.use('/legal', require('./routes/legal.js'));
//api to process all admin requests (e.g. complete tx's, add posts)
app.use('/api', require('./routes/api.js'));
//api to process all public requests 
app.use('/publicapi', require('./routes/publicApi.js'));
//callback url for payment processor
app.use('/callback', require('./routes/callback.js'))
//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
  res.status(404).render('errors/404');
});

if(env.toLowerCase() == 'production'){
  // Variables for https and http
  var port_http = 80 //port for http
  var port_https = 443 //port for https
  // we will pass our 'app' to 'https' server
  https.createServer({
      key: fs.readFileSync('./ssl/key.pem'),
      cert: fs.readFileSync('./ssl/cert.pem')
      //passphrase: 'password'
  }, app)
  .listen(port_https);

  // Redirect from http port 80 to https
  var http = require('http');
  http.createServer(function (req, res) {
      res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
      res.end();
  }).listen(port_http);
}

else {
  const PORT = 5000;
  //start application
  app.listen(PORT, console.log(`Server started on port ${PORT}`));
}
