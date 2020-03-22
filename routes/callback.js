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

//callback
router.get('/', (req, res) => {
  var id = req.query.id
  var secret_api = req.query.secret
  var value = req.query.value
  var input_address = req.query.input_address
  var confirmations = req.query.confirmations
  var transaction_hash = req.query.transaction_hash //forwarded payment
  var input_transaction_hash = req.query.input_transaction_hash //customer payment
  var destination_address = req.query.destination_address

  var btc_value = value / 100000000
  var status = 'PAID'

  if(!id || !secret_api || !value || ! input_address || !confirmations || !transaction_hash || !input_transaction_hash || !destination_address){
    res.render('errors/500')
  } else {
    //save callback to database
    var values = [[id, btc_value, input_address, confirmations, transaction_hash, input_transaction_hash, destination_address]]
    var callback_sql = 'INSERT INTO callbacks(id , value , input_address , confirmations , transaction_hash , input_transaction_hash , destination_address ) VALUES ?'
    con.con.query(callback_sql, [values], (err, result) => {
      if(err){ console.log('Error adding callback! CODE: '+ err)}
      else{console.log("Callback added")}
    })
    //check if secret is correct
    if(secret_api != secret || destination_address != address){
      res.status(401)
    }
    //secret and address are correct, get details of the transaction and compare amount
    var sql = 'SELECT * FROM exchange WHERE id=?'
    con.con.query(sql, id, (err, result) => {
      if (err) {res.render("errors/500")}
      if(result.length == 0){
        res.render('errors/500')
        console.log('This ID does not exixst (callback). ID: ' +id)
      } else {
        var amount = result[0].amount
        console.log(amount)
        if((btc_value) >= amount){
          //payment is completed, update status
          var sql2 = 'UPDATE exchange SET status=? WHERE id=?'
          con.con.query(sql2, [status, id], (err, result) => {
            if(err){
              res.send('*ok*')
              console.log('Error updating status! CODE: ' + err)
            } else {
              res.send('*ok*')
              console.log('Status updated!')
            }
          })
        } else {
          //payment not completed, do not update status
          res.send('*ok*')
        }
      }
    })
  }
});

module.exports = router;
