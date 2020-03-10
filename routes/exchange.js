const express = require('express');
const router = express.Router();

var QRCode = require('qrcode');
var base64Img = require('base64-img');
const request = require('request');

//Load functions
const functions = require('../scripts/functions.js')

//connect to MySLQ database
var con = require("../scripts/config.js")

router.get('/', (req, res) => {

  // TODO: Sanitize this input
  var id = req.query.id  //'?id=0a9988e2f152453'

  var from = req.query.from

  if (id != null && id != undefined){
    id_sql = [[id]];
    con.con.query("SELECT * FROM exchange WHERE id = ?;", id_sql, function (err, result) {
      try {
        if (result == undefined){
          res.send("This ID is not is the database!")
        } else {
          console.log(result)
          var amount = result[0].amount
          var address = result[0].address
          var email = result[0].email
		  var receive = result[0].receive

          request({
              url: "http://blockchain.info/balance?active="+address,
              json: true
          }, function(error, response, body) {
            if (error){
              return error
            }
            var a = body
            var b = Object.entries(a);
            var finalBalance = b[0][1].final_balance //final balance, n_tx, total_received

            console.log(finalBalance)
            var address_amount = address + '_' + amount
            QRCode.toDataURL('bitcoin:' + address + '?amount='+amount, { errorCorrectionLevel: 'H' }, function (err, url) {
              base64Img.img(url, 'dest', address_amount, function(err, filepath) {
                var qr = filepath.substring(4)

                if(amount > finalBalance){
                  res.render('exchange', {
                    id: id,
                    amount: amount,
                    address: address,
                    qr: qr,
                    email: email,
					receive: receive,
                    status: 'Waiting for payment...'
                  })
                } //if(amount > finalBalance)
                else {
                  res.render('paid', {
                    id: id,
                    amount: amount,
                    address: address,
                    email: email,
					receive: receive,
                    status: 'Processing...'
                  })
                }
              })
            })
          })
        //  var finalBalance = functions.getBalance(address) //get balance from bitcoin address
        //  console.log(finalBalance)
        }
      } catch (err){
        if(from == 'search'){
          var redirect_script = "location.href = '/exchange/search';"
          var html = 'Please check your ID!<script>function redirect(){'+redirect_script+'}; setTimeout(redirect, 3000);</script> Redirecting you back...'
          res.send(html)
        } else {
          if (err.name == 'TypeError'){
            res.send('Please check your ID!')
          } else {
            console.log("Error selecting from exchenge where ID..." + err.name)
            res.send("INTERNAL SERVER ERROR, PLEASE CONTACT SUPPORT! <a href='/'>[RETURN TO MAIN PAGE]</a>"+err)
          }
        }
      };
    }) //con.query
  } else {
    res.send('Please check your ID')
  }
});

router.get('/search', (req, res) => {
  res.render('search')
})



module.exports = router;
