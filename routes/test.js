const express = require('express');
const router = express.Router();

//Load functions
const functions = require('../scripts/functions.js')

//connect to MySQL database
var con = require("../scripts/config.js")

var table = ''

router.get('/', (req, res) => {
  for (var i = 0; i < 10; i++) {
    
  }
  res.send(table)
})
module.exports = router;

/*
var i = 1
setInterval(function(){
  n = '.'.repeat(i)
  var status_1 = '<%= status %>' + n
  document.getElementById("status_id").innerHTML = status_1;
  i += 1
  if(i>3){
    i = 1
  }
}, 1000)
*/
