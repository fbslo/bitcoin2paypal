const express = require('express');
const router = express.Router();

//Load functions
const functions = require('../scripts/functions.js')

//connect to MySQL database
var con = require("../scripts/config.js")

// at /api/completeTransaction
router.post('/completeTransaction', (req, res) => {
  var id = req.body.id
  var key = req.body.key
  if(!key || !id){
    //key or id missing
    res.send("Missing info!")
  }
  else if (key != 'thisismylife'){
    //key is not correct
    res.send("Wrong key")
  }
  else {
    //complete transaction
    var sql = "UPDATE exchange SET status='COMPLETED' WHERE id= ?"
    var value = id
    con.con.query(sql, value, function(err, result){
      if(!err){
        var redirect_script = "location.href = '/admin/dashboard';"
        var html = 'SUCCESS!<script>function redirect(){'+redirect_script+'}; setTimeout(redirect, 3000);</script> Redirecting you back...'
        res.send(html)
      } else {
        var redirect_script = "location.href = '/admin/dashboard';"
        var html = 'ERROR!<script>function redirect(){'+redirect_script+'}; setTimeout(redirect, 3000);</script> Redirecting you back...'
        res.send(html)
      }
    })
  }
})

// at /api/addPost
router.post('/addPost', (req, res) => {
  var id = req.body.id
  var key = req.body.key
  if(!key || !id){
    //key or id missing
    res.send("Missing info!")
  }
  else if (key != 'thisismylife'){
    //key is not correct
    res.send("Wrong key")
  }
  else {
    //complete transaction
    var sql = "UPDATE exchange SET status='COMPLETED' WHERE id= ?"
    var value = id
    con.con.query(sql, value, function(err, result){
      if(!err){
        var redirect_script = "location.href = '/admin/dashboard';"
        var html = 'SUCCESS!<script>function redirect(){'+redirect_script+'}; setTimeout(redirect, 3000);</script> Redirecting you back...'
        res.send(html)
      } else {
        var redirect_script = "location.href = '/admin/dashboard';"
        var html = 'ERROR!<script>function redirect(){'+redirect_script+'}; setTimeout(redirect, 3000);</script> Redirecting you back...'
        res.send(html)
      }
    })
  }
})

module.exports = router;
