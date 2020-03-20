const express = require('express');
const router = express.Router();
const fs = require('fs');

//Load functions
const functions = require('../scripts/functions.js')

//connect to MySQL database
var con = require("../scripts/config.js")

//Get API key from configuration file
let rawdata = fs.readFileSync('./config/config.json');
let config_json = JSON.parse(rawdata);
var api_key_backend = config_json.api_key

router.get('/', (req, res) => {
  //header statistic
  var sum = 0;
  var sql = `SELECT * FROM exchange; SELECT * FROM visitors; SELECT * FROM exchange WHERE status ='PENDING';
  SELECT receive FROM exchange WHERE status ='COMPLETED' OR status='PENDING';
  SELECT receive FROM exchange WHERE status ='COMPLETED';
  SELECT address FROM addresses WHERE status ='USED';
  SELECT address FROM addresses WHERE status ='UNUSED';` //[0] = orders, [1] = visitors, [2] = pending, [3] = revenue, [4] = completed, [5][6] = unused/used addresses,
  con.con.query(sql, function(err, result){
    var orders = result[0].length
    var visitors = (result[1].length).toLocaleString(undefined, {maximumFractionDigits:2})
    var pending = result[2].length
    for (i=0;i<result[3].length;i++){
      sum += Number(result[3][i].receive)
    }
    var completed_tx = result[4].length
    var revenue = (sum.toFixed(2)).toLocaleString(undefined, {maximumFractionDigits:2})
    var addresses_used = result[5].length
    var addresses_unused = result[6].length
    //table statistics
    var table = ''
    for(i=0;i<result[0].length;i++){
      var status_code;
      if (result[0][i].status == 'PENDING'){
        status_code = 'info'
      }
      if (result[0][i].status == 'COMPLETED'){
        status_code = 'primary'
      }
      if (result[0][i].status == 'UNPAID'){
        status_code = 'danger'
      }
      table +=  `<tr><td>${i+1}</td><td>${result[0][i].id}</td>
      <td>${(result[0][i].date).substr(0, 10)}</td><td>${result[0][i].email}</td><td>${result[0][i].amount}</td>
      <td>${result[0][i].receive}</td>
      <td><label class='badge badge-${status_code}'>${result[0][i].status}</label></td>

      <td><form action="/api/completeTransaction" method="POST">
      <input type='hidden' id='key' name='key' value='${api_key_backend}'>
      <input type='hidden' id='id' name='id' value='${result[0][i].id}'>
      <input type="submit" value="Complete" class='btn btn-outline-primary'/></form></td>

      <td><form action="/api/deleteTransaction" method="POST">
      <input type='hidden' id='key' name='key' value='${api_key_backend}'>
      <input type='hidden' id='id' name='id' value='${result[0][i].id}'>
      <input type="submit" value="Delete" class='btn btn-outline-danger'/>
      </form></td></tr>`
    }
    res.render('admin/admin',{
      orders: orders,
      clicks: visitors,
      completed_tx: completed_tx,
      revenue: revenue,
      addresses_used: addresses_used,
      addresses_unused: addresses_unused,
      pending: pending,
      table: table
    })
  })
})

router.get('/dashboard', (req, res) => {
  //header statistic
  var sum = 0;
  var sql = `SELECT * FROM exchange; SELECT * FROM visitors; SELECT * FROM exchange WHERE status ='PENDING';
  SELECT receive FROM exchange WHERE status ='COMPLETED' OR status='PENDING';
  SELECT receive FROM exchange WHERE status ='COMPLETED';
  SELECT address FROM addresses WHERE status ='USED';
  SELECT address FROM addresses WHERE status ='UNUSED';` //[0] = orders, [1] = visitors, [2] = pending, [3] = revenue, [4] = completed, [5][6] = unused/used addresses,
  con.con.query(sql, function(err, result){
    var orders = result[0].length
    var visitors = (result[1].length).toLocaleString(undefined, {maximumFractionDigits:2})
    var pending = result[2].length
    for (i=0;i<result[3].length;i++){
      sum += Number(result[3][i].receive)
    }
    var completed_tx = result[4].length
    var revenue = (sum.toFixed(0)).toLocaleString(undefined, {maximumFractionDigits:2})
    var addresses_used = result[5].length
    var addresses_unused = result[6].length
    //table statistics
    var table = ''
    for(i=0;i<result[0].length;i++){
      var status_code;
      if (result[0][i].status == 'PENDING'){
        status_code = 'info'
      }
      if (result[0][i].status == 'COMPLETED'){
        status_code = 'primary'
      }
      if (result[0][i].status == 'UNPAID'){
        status_code = 'danger'
      }
      table +=  `<tr><td>${i+1}</td><td>${result[0][i].id}</td>
      <td>${(result[0][i].date).substr(0, 10)}</td><td>${result[0][i].email}</td><td>${result[0][i].amount}</td>
      <td>${result[0][i].receive}</td>
      <td><label class='badge badge-${status_code}'>${result[0][i].status}</label></td>
      <td><form action="/api/completeTransaction" method="POST">
      <input type='hidden' id='key' name='key' value='${api_key_backend}'>
      <input type='hidden' id='id' name='id' value='${result[0][i].id}'>
      <input type="submit" value="Complete" class='btn btn-outline-primary'/>
      </form></tr>`
    }
    res.render('admin/index',{
      orders: orders,
      clicks: visitors,
      completed_tx: completed_tx,
      revenue: revenue,
      addresses_used: addresses_used,
      addresses_unused: addresses_unused,
      pending: pending,
      table: table
    })
  })
})

router.get('/addpost', (req, res) => {
  var status = req.query.status
  res.render('admin/addpost', {
    api_key: api_key_backend,
    status: status
  })
})

router.get('/posts', (req, res) => {
  var status = req.query.editstatus
  var sql = 'SELECT * FROM blog;'
  con.con.query(sql, function(err, result) {
    //table of posts
    var table = ''
    var dots_body = ''
    var dots_title = ''
    for(i=0;i<result.length;i++){
      if(result[i].blog.length > 30){
        dots_body = '...'
      }
      if(result[i].title.length > 30){
        dots_title = '...'
      }
      table +=  `<tr><td>${i+1}</td><td>${result[i].id}</td>
      <td>${(result[i].date).substr(0, 10)}</td><td>${result[i].author}</td><td>${((result[i].title).substr(0, 25))+dots_title}</td>
      <td>${((result[i].blog).substr(0, 30))+dots_body}</td><td>${result[i].image}</td>
      <td><a href='/admin/editpost?id=${result[i].id}'>
      <input type="submit" value="Edit" class='btn btn-outline-primary'/></a></td>

      <td><form action="/api/deletePost" method="POST">
      <input type='hidden' id='key' name='key' value='${api_key_backend}'>
      <input type='hidden' id='id' name='id' value='${result[i].id}'>
      <input type="submit" value="Delete" class='btn btn-outline-danger'/>
      </form></td>`
    }
    res.render('admin/posts', {
      table_body: table,
      status: status
    })
  })
})

router.get('/editpost', (req, res) => {
  var id = req.query.id
  if(!id){
    res.send("Please enter post ID! e.g. website.com/admin/editpost?id=1538f3fef9")
  } else {
    var sql = "SELECT * FROM blog WHERE id= ?"
    var value = id
    con.con.query(sql, [value], function(err, result){
      if (err) {
        res.send("ERROR! " + err)
      }
      else{
        if (result.length == 0) {
          res.send("Wrong Post ID!")
        }
        else {
          var body = result[0].blog
          var title = result[0].title
          res.render('admin/editpost', {
            api_key: api_key_backend,
            title: title,
            body: body,
            id: id
          })
        }
      }
    });
  }
})

router.get('/affiliates', (req, res) => {
  var sql = 'SELECT * FROM affiliate;'
  con.con.query(sql, function(err, result){
    var table = ''
    for(i=0;i<result.length;i++){
      table += `<tr><td>${i+1}</td><td>${result[i].affiliate_id}</td>
      <td>${result[i].clicks}</td><td>${result[i].other}</td>

      <td><form action="/api/deleteAffiliate" method="POST">
      <input type='hidden' id='key' name='key' value='${api_key_backend}'>
      <input type='hidden' id='id' name='id' value='${result[i].affiliate_id}'>
      <input type="submit" value="Delete" class='btn btn-outline-danger'/>
      </form></td>`
    }
    res.render('admin/affiliates', {
      status: req.query.deletestatus,
      table: table
    })
  })
})

router.get('/addaffiliate', (req, res) => {
  var status = req.query.status
  res.render('admin/add_affiliate', {
    status: status,
    api_key: api_key_backend
  })
})

router.get('/visitors', (req, res) => {
  var sql = 'SELECT * FROM visitors;'
  con.con.query(sql, function(err, result){
    var table = ''
    for(i=0;i<result.length;i++){
      table += `<tr><td>${i+1}</td><td>${result[i].ip}</td>
      <td>${result[i].time}</td><td>${result[i].affiliate}</td>`
    }
    res.render('admin/visitors', {
      table: table
    })
  })
})

router.get('/addresses', (req, res) => {
  var sql = 'SELECT * FROM addresses;'
  var updateStatus = req.query.updateStatus || ''
  var deleteStatus = req.query.deleteStatus || ''
  var statusButton = 'notDisable'
  con.con.query(sql, function(err, result){
    if(!err){
      var table = ''
      for(i=0;i<result.length;i++){
        if (result[i].status == 'UNUSED'){
          statusButton = 'disable'
        }
        table += `<tr><td>${i+1}</td><td>${result[i].address}</td>
        <td>${result[i].status}</td>

        <td><form action="/api/changeAddressStatus" method="POST">
        <input type='hidden' id='key' name='key' value='${api_key_backend}'>
        <input type='hidden' id='id' name='id' value='${result[i].address}'>
        <input type="submit" value="Change status" id='${statusButton + (i+1)}' class='btn btn-outline-primary'/></form></td>

        <td><form action="/api/deleteAddress" method="POST">
        <input type='hidden' id='key' name='key' value='${api_key_backend}'>
        <input type='hidden' id='id' name='id' value='${result[i].address}'>
        <input type="submit" value="Delete" class='btn btn-outline-danger'/>
        </form></td></tr>`
      }
      res.render('admin/addresses', {
        updateStatus: updateStatus,
        deleteStatus: deleteStatus,
        table: table
      })
    } else {
      res.send("ERROR")
      console.log("Error getting addresses! CODE: " + err)
    }
  })
})

router.get('/addaddress', (req, res) => {
  var status = req.query.status || 'Satoshi'
  var notBtcAddress = req.query.notBtcAddress || 'Satoshi'
  res.render('admin/add_address', {
    status: status,
    api_key: api_key_backend,
    notBtcAddress: notBtcAddress
  })
})

module.exports = router;
