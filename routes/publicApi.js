const express = require('express');
const router = express.Router();
const fs = require('fs');

//Load functions
const functions = require('../scripts/functions.js')

//connect to MySQL database
var con = require("../scripts/config.js")

//Get data from configuration file
let rawdata = fs.readFileSync('./config/config.json');
let config_json = JSON.parse(rawdata);
var api_status = config_json.public_api


//get /publicapi/reviews
router.get('/reviews', (req, res) => {
  if(api_status != true){
    res.render('errors/401')
  } else {
    var sql = "SELECT * FROM reviews"
    con.con.query(sql, (err, result) => {
      res.json(result)
    })
  }
})



module.exports = router;
