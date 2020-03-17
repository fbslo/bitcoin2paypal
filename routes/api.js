const express = require('express');
const router = express.Router();
const fs = require('fs');


//Load functions
const functions = require('../scripts/functions.js')

//Get API key from configuration file
let rawdata = fs.readFileSync('./config.json');
let config_json = JSON.parse(rawdata);
var api_key_backend = config_json.api_key

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
  else if (key != api_key_backend){
    //key is not correct
    res.send("Wrong key")
  }
  else {
    //complete transaction
    var sql = "UPDATE exchange SET status='COMPLETED' WHERE id= ?"
    var value = id
    con.con.query(sql, value, function(err, result){
      if(!err){
        var redirect_script = "location.href = '/admin';"
        var html = 'SUCCESS!<script>function redirect(){'+redirect_script+'}; setTimeout(redirect, 1000);</script> Redirecting you back...'
        res.send(html)
      } else {
        var redirect_script = "location.href = '/admin';"
        var html = 'ERROR!<script>function redirect(){'+redirect_script+'}; setTimeout(redirect, 1000);</script> Redirecting you back...'
        res.send(html)
      }
    })
  }
})

//deleteTransaction
router.post('/deleteTransaction', (req, res) => {
  var id = req.body.id
  var key = req.body.key
  if(!key || !id){
    //key or id missing
    res.send("Missing info!")
  }
  else if (key != api_key_backend){
    //key is not correct
    res.send("Wrong key")
  }
  else {
    //complete transaction
    var sql = "DELETE FROM exchange WHERE id= ?"
    var value = id
    con.con.query(sql, value, function(err, result){
      if(!err){
        var redirect_script = "location.href = '/admin';"
        var html = 'SUCCESS!<script>function redirect(){'+redirect_script+'}; setTimeout(redirect, 1000);</script> Redirecting you back...'
        res.send(html)
      } else {
        var redirect_script = "location.href = '/admin';"
        var html = 'ERROR!<script>function redirect(){'+redirect_script+'}; setTimeout(redirect, 1000);</script> Redirecting you back...'
        res.send(html)
      }
    })
  }
})

// at /api/addPost
router.post('/addPost', (req, res) => {
  var title = req.body.titleblog
  var body = req.body.bodyblog
  var image = req.files.file
  var api_key = req.body.api_key
  var date = new Date()
  var author = 'Admin'
  var id = functions.generateHexString(10)
  if(!api_key || !title || !body || !image || !req.files || Object.keys(req.files).length === 0){
    //key or id missing
    res.send("Missing info!")
  }
  else if (api_key != api_key_backend){
    //key is not correct
    res.send("Wrong key")
  }
  else {
    //verify that file is image
    if(image.mimetype != 'image/jpeg' && image.mimetype != 'image/png' && image.mimetype != 'image/gif') {
      res.redirect('/admin/addPost?status=false')
      console.log(image.mimetype)
    } else {
      //complete transaction
      image.mv(require('path').dirname(require.main.filename)+'/public/img/blog/'+image.name, function(err) {
        var sql = "INSERT INTO blog (title, blog, author, date, image, id) VALUES ?"
        var values = [[title, body, author, date, image.name, id]]
        con.con.query(sql, [values], function(error, result){
          if(!err){
            res.redirect('/admin/addPost?status=true')
          } else {
            res.redirect('/admin/addPost?status=false')
          }
        })
      })
    }
  }
})


router.post('/deletePost', (req, res) => {
  var id = req.body.id
  var key = req.body.key
  if(!key || !id){
    //key or id missing
    res.send("Missing info!")
  }
  else if (key != api_key_backend){
    //key is not correct
    res.send("Wrong key")
  }
  else {
    //complete transaction
    var sql = "DELETE FROM blog WHERE id= ?"
    var value = id
    con.con.query(sql, value, function(err, result){
      if(!err){
        var redirect_script = "location.href = '/admin/posts';"
        var html = 'SUCCESS!<script>function redirect(){'+redirect_script+'}; setTimeout(redirect, 1000);</script> Redirecting you back...'
        res.send(html)
      } else {
        var redirect_script = "location.href = '/admin/posts';"
        var html = 'ERROR!<script>function redirect(){'+redirect_script+'}; setTimeout(redirect, 1000);</script> Redirecting you back...'
        res.send(html)
      }
    })
  }
})


router.post('/editPost', (req, res) => {
  var title = req.body.titleblog
  var body = req.body.bodyblog
  var image_raw = req.files
  var api_key = req.body.api_key
  var date = new Date()
  var author = 'Admin'
  var id = req.body.id
  if(!api_key || !title || !body){
    //key or id missing
    res.send("Missing info!")
  }
  else if (api_key != api_key_backend){
    //key is not correct
    res.send("Wrong key")
  }
  else {
    //check if image was uploaded

    if(image_raw){
      var image = image_raw.file
      //verify that file is image
      if(image.mimetype != 'image/jpeg' && image.mimetype != 'image/png' && image.mimetype != 'image/gif') {
        res.redirect('/admin/posts?editstatus=false')
      } else {
        //complete transaction
        image.mv(require('path').dirname(require.main.filename)+'/public/img/blog/'+image.name, function(err) {
          var sql = 'UPDATE blog SET title=?, blog=?, image=? WHERE id=?'
          con.con.query(sql, [title, body, image.name, id], function(error, result){
            if(!error){
              res.redirect('/admin/posts?editstatus=true')
            } else {
              res.redirect('/admin/posts?editstatus=false')
            }
          })
        })
      }
    } else {
      //image was not updated
      var sql = 'UPDATE blog SET title=?, blog=? WHERE id=?'
      con.con.query(sql, [title, body, id], function(error, result){
        if(!error){
          res.redirect('/admin/posts?editstatus=true')
        } else {
          res.redirect('/admin/posts?editstatus=false')
        }
      });
    }
  }
})

module.exports = router;
