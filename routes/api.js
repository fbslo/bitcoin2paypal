const express = require('express');
const router = express.Router();
const fs = require('fs');
var WAValidator = require('wallet-address-validator');


//Load functions
const functions = require('../scripts/functions.js')

//Get API key from configuration file
let rawdata = fs.readFileSync('./config/config.json');
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
  var views = 0
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
        var sql = "INSERT INTO blog (title, blog, author, date, image, id, views) VALUES ?"
        var values = [[title, body, author, date, image.name, id, views]]
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

router.post('/deleteAffiliate', (req, res) => {
  var key = req.body.key
  var id = req.body.id
  if(key != api_key_backend){
    res.send("Wrong key!")
  }
  if(!id || !key){
    res.send("Missing info!")
  }
  //delete affiliate from database
  var sql = "DELETE FROM affiliate WHERE affiliate_id=?"
  con.con.query(sql, id, function(err, result){
    if(err){ res.send("ERROR DELETING FROM DATABASE!" + err)}
    else {
      res.redirect('/admin/affiliates?deletestatus=true')
    }
  })
})

router.post('/addAffiliate', (req, res) => {
  var key = req.body.api_key
  var affiliate_id = req.body.id
  var other = req.body.other
  var clicks = 0
  var id = req.body.id
  if(key != api_key_backend){
    res.send("Wrong API key!")
  }
  if(!id || !key){
    res.send("Missing info!")
  }
  var values = [[id, clicks, other]]
  var sql = 'INSERT INTO affiliate (affiliate_id, clicks, other) VALUES ?'
  con.con.query(sql, [values], function(err, result){
    if(!err){
      res.redirect('/admin/addaffiliate?status=true')
    } else {
      res.redirect('/admin/affiliate?deletestatus=false')
    }
  })
})

router.post('/changeAddressStatus', (req, res) => {
  var address = req.body.id
  var api_key_frontend = req.body.key
  if(!address || !api_key_frontend){
    res.send("Missing info!")
  }
  if(api_key_frontend != api_key_backend){
    res.send("Wrong API key!")
  }
  //check current status
  var sql = 'SELECT * FROM addresses WHERE address=?'
  con.con.query(sql, address, function(err, result){
    if(err){
      console.log("ERROR getting address status from database! CODE: " + err)
    } else{
      //check current status
      if(result[0].status == 'UNUSED'){
        //cannot change status
        res.send("Status is UNUSED and it cannot be changed!")
      } else{
        //change status to UNUSED
        var updateSql = 'UPDATE addresses SET status=? WHERE address=?;'
        var status = [['UNUSED']]
        con.con.query(updateSql, [status, address], function(err, result){
          if(!err){
            res.redirect('/admin/addresses?updateStatus=true')
          } else{
            res.redirect('/admin/addresses?updateStatus=false')
            console.log("Error updating status! CODE: " + err)
          }
        })
      }
    }
  })
})

router.post('/deleteAddress', (req, res) => {
  var address = req.body.id
  var api_key_frontend = req.body.key
  if(!address || !api_key_frontend){
    res.send("Missing info!")
  }
  if(api_key_frontend != api_key_backend){
    res.send("Wrong API key!")
  }
  var sql = 'DELETE FROM addresses WHERE address=?'
  con.con.query(sql, address, function(err, result){
    if(err){
      console.log("ERROR getting address status from database! CODE: " + err)
      res.redirect('/admin/addresses?deleteStatus=false')
    } else {
      res.redirect('/admin/addresses?deleteStatus=true')
    }
  })
})

router.post('/addAddress', (req, res) => {
  var address = req.body.address
  var api_key_frontend = req.body.api_key
  if(!address || !api_key_frontend){
    res.send("Missing info!")
  }
  if(api_key_frontend != api_key_backend){
    res.send("Wrong API key!")
  }
  //check if it's valid address
  var valid = WAValidator.validate(address, 'BTC'); //check if valid address
  if(valid){
    var sql = 'INSERT INTO addresses (address, status) VALUES ?'
    var values = [[address, 'UNUSED']]
    con.con.query(sql, [values], function(err, result){
      if(err){
        console.log("ERROR adding address into database! CODE: " + err)
        res.redirect('/admin/addresses?Status=false')
      } else {
        res.redirect('/admin/addresses?deleteStatus=true')
      }
    })
  }
  //not valid address
  else {
    res.redirect('/admin/addaddress?notBtcAddress=true')
  }
})

router.post('/deleteReview', (req, res) => {
  var id = req.body.id
  var api_key_frontend = req.body.key
  if(!id || !api_key_frontend){
    res.send("Missing info!")
  }
  if(api_key_frontend != api_key_backend){
    res.send("Wrong API key!")
  }
  var sql = 'DELETE FROM reviews WHERE id=?'
  con.con.query(sql, id, function(err, result){
    if(!err){
      res.redirect('/admin/reviews?deleteStatus=true')
    } else {
      res.redirect('/admin/addaddress?deleteStatus=true')
      console.log("Error deleting review! CODE: " + err)
    }
  })
})

router.post('/addReview', (req, res) => {
  var author = req.body.author
  var review = req.body.review
  var api_key_frontend = req.body.api_key
  var id = functions.generateHexString(10)
  //insert new review
  var sql = 'INSERT INTO reviews (id, author, message) VALUES ?'
  var values = [[id, author, review]]
  con.con.query(sql, [values], function(err, result){
    if(!err){
      res.redirect('/admin/addreview?status=true')
    } else {
      res.redirect('/admin/addreview?status=false')
      console.log("Error deleting review! CODE: " + err)
    }
  })
})

router.post('/deleteMessage', (req, res) => {
  var email = req.body.email
  var ip = req.body.ip
  var date = req.body.date
  var api_key_frontend = req.body.api_key
  var sql = 'DELETE FROM message WHERE email = ? AND date = ? AND ip = ?'
  con.con.query(sql, [email, date, ip], function(err, result){
    if(!err){
      res.redirect('/admin/messages?status=true')
    } else {
      res.redirect('/admin/messages?status=false')
      console.log("Error deleting Message! CODE: " + err)
    }
  })
})

module.exports = router;
