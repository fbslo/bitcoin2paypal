const express = require('express');
const router = express.Router();

//Load functions
const functions = require('../scripts/functions.js')

//connect to MySQL database
var con = require("../scripts/config.js")

//get data POST to /create
router.post('/', (req, res) => {
  var id = functions.generateHexString(15) //generate ID
  var email = req.body.email
  var amount_raw = req.body.amount
  var amount = parseFloat(parseFloat(amount_raw).toFixed(8))
  var date = new Date()
  var ip_raw = req.ip || req.ips || req.connection.remoteAddress
  var ip = ip_raw.replace('::ffff:', '');
  var ref = req.body.ref
  var receive = (+req.body.receive).toFixed(2)
  

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

      var sql = "INSERT INTO exchange (id, email, amount, date, address, refferal, receive, ip) VALUES ?";
      var values = [[id, email, amount, date, address, ref, receive, ip]];
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
});

module.exports = router;
