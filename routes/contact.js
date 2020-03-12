const express = require('express');
const router = express.Router();

//get sanitizer
var sanitizer = require('sanitizer');


//connect to MySQL database
var con = require("../scripts/config.js")

router.post('/', (req, res) => {
  var email = sanitizer.sanitize(req.body.email)
  var name = sanitizer.sanitize(req.body.first_name + ' ' + req.body.last_name)
  var phone = sanitizer.sanitize(req.body.phone)
  var message = sanitizer.sanitize(req.body.message)
  var ip_raw = req.ip || req.ips || req.connection.remoteAddress
  var ip = ip_raw.replace('::ffff:', '');
  var date = new Date();
  if(!email || !name || !message){
    res.redirect('/contact?status=false')
  }
  else if(!phone){
    let phone = '000000000'

    var sql = "INSERT INTO message (email, name, phone, message, date) VALUES ?";
    var values = [[email, name, phone, message, date]];
    con.con.query(sql, [values], function (err, result) { //insert data to MySQL database
      if (err){
        console.log("Error inserting message: " + err)
        res.redirect('/contact?status=false')
      } else {
        console.log("Message inserted: " + values)
        res.redirect('/contact?status=true')
      }
    });
  }
  else {
    var sql = "INSERT INTO message (email, name, phone, message, date) VALUES ?";
    var values = [[email, name, phone, message, date]];
    con.con.query(sql, [values], function (err, result) { //insert data to MySQL database
      if (err){
        console.log("Error inserting message: " + err)
        res.redirect('/contact?status=false')
      } else {
        console.log("Message inserted: " + values)
        res.redirect('/contact?status=true')
      }
    });
  }
});



module.exports = router;
