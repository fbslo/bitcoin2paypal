const express = require('express');
const router = express.Router();

//Load functions
const functions = require('../scripts/functions.js')

//connect to MySQL database
var con = require("../scripts/config.js")

//get /publicapi/reviews
router.get('/reviews', (req, res) => {
  var sql = "SELECT * FROM reviews"
  con.con.query(sql, (err, result) => {
    res.json(result)
  })
})


module.exports = router;
