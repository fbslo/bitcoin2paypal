const express = require('express');
const router = express.Router();
const request = require('request');

//get sanitizer
var sanitizer = require('sanitizer');

//Get secret key & deposit address from configuration file
let rawdata = fs.readFileSync('./config/config.json');
let config_json = JSON.parse(rawdata);
var secret = config_json.callback_secret
var address = config_json.deposit_address //all funds will be redirected to this address by payment processor

//Load functions
const functions = require('../scripts/functions.js')

//connect to MySQL database
var con = require("../scripts/config.js")

//get data POST to /create
router.post('/', (req, res) => {
  var id = functions.generateHexString(15) //generate ID
  var email = sanitizer.sanitize(req.body.email)
  var amount_raw = sanitizer.sanitize(req.body.amount)
  var amount = parseFloat(parseFloat(amount_raw).toFixed(8))
  var date = new Date()
  var ip_raw = req.ip || req.ips || req.connection.remoteAddress
  var ip = ip_raw.replace('::ffff:', '');
  var ref = req.body.ref
  var receive = (+req.body.receive).toFixed(2)
  var status = 'UNPAID'

  var callback = 'https://btc2pp.net/callback?id='+id+'&secret='+secret

  /*make api call to blockchainapi.com to get paymet address
  { fee_percent: 1,
  destination: '18cCRSfB7w77BfPTdVjTgkc2n2KtNyMvJC',
  input_address: '3JBwbFKrJxveLD3ZqGGHBPC8NRrbP9raya',
  callback_url: 'https://btc2pp.net/callback?id=4c5e382a282fbd1' }
  */
  request('https://blockchainapi.org/api/receive?method=create&address='+address+'&callback='+callback, { json: true }, (err, res, body) => {
    if (err) {res.redirect('errors/500')}
    var input_address = body.input_address
    //save details into database
    var sql = 'INSERT INTO exchange (date, email, amount, address, id, refferal, ip, receive, status) VALUES ?'
    con.con.query(sql, [date, email, amount, input_address, id, ref, ip, receive, status], (err, result) => {
      if (err) {res.render('errors/500')}
      res.redirect('/exchange?id='+id)
    })
  });


/*
  //get unused address
  con.con.query("SELECT address FROM addresses WHERE status = 'UNUSED';", function (err, result) {
    if(result.length == 0){
      //no addresses in the database
	  console.log('NO ADDRESS IN THE DATABASE')
      res.status(500)
      res.render('errors/500')
    }
    else{
      var address = result[0].address
      var status = 'UNPAID'

      var sql = "INSERT INTO exchange (id, email, amount, date, address, refferal, receive, ip, status) VALUES ?";
      var values = [[id, email, amount, date, address, ref, receive, ip, status]];
      con.con.query(sql, [values], function (err, result) { //insert data to MySQL database
        if (err) throw err;
        console.log("New transaction! Values: " + values)
        //change address status
        var change_address_status_sql = "UPDATE addresses SET status = 'USED' WHERE address = ?";
        var values_change_status = [[address]];
        con.con.query(change_address_status_sql, values_change_status, function (err, result) { //insert data to MySQL database
			  console.log('Address status updated')
        })
        res.redirect('/exchange?id='+id);
      })
    }
  })
  */
});

module.exports = router;
