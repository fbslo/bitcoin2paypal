const express = require('express');
const router = express.Router();
const request = require('request');
const fs = require('fs');

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
  request('https://blockchainapi.org/api/receive?method=create&address='+address+'&callback='+callback, { json: true }, (error, response, body) => {
    if (error) {
      res.redirect('errors/500')
    }
    var input_address = body.input_address
    //save details into database
    var sql = 'INSERT INTO exchange (date, email, amount, address, id, refferal, ip, receive, status) VALUES ?'
	  var values = [[date, email, amount, input_address, id, ref, ip, receive, status]]
    con.con.query(sql, [values], (err, result) => {
      if (err) {
  		 res.render('errors/500')
  	  }
      res.redirect('/exchange?id='+id)
    })
  });
});

module.exports = router;
