const express = require('express');
const router = express.Router();

//get sanitizer
var sanitizer = require('sanitizer');


//connect to MySQL database
var con = require("../scripts/config.js")

router.post('/', (req, res) => {
  var email = (sanitizer.sanitize(req.body.email)).substr(0, 21)
  var name = (sanitizer.sanitize(req.body.first_name + ' ' + req.body.last_name)).substr(0, 31)
  var phone = (sanitizer.sanitize(req.body.phone)).substr(0, 16)
  var message = (sanitizer.sanitize(req.body.message)).substr(0, 250)
  var ip_raw = req.ip || req.ips || req.connection.remoteAddress
  var ip = ip_raw.replace('::ffff:', '');
  var date = new Date();

  var spam_list = ['www', 'https', 'http', '.com', '.ru', '.net'] 
  var spam = 0;
  for(i=0;i<spam_list.length;i++){
    if(message.includes(spam_list[i])){
      spam += 1
    } else {
      spam += 0
    }
  }


  if(!email || !name || !message){
    res.redirect('/contact?status=false')
  }
  else if(spam != 0){
    res.redirect('/contact?status=spam')
  }
  else if(!phone){
    let phone = '000000000'

    var sql = "INSERT INTO message (email, name, phone, message, date, ip) VALUES ?";
    var values = [[email, name, phone, message, date, ip]];
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
    var sql = "INSERT INTO message (email, name, phone, message, date, ip) VALUES ?";
    var values = [[email, name, phone, message, date, ip]];
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
