const express = require('express');
const router = express.Router();

//Load functions
const functions = require('../scripts/functions.js')

//connect to MySQL database
var con = require("../scripts/config.js")

router.get('/', (req, res) => {
  res.render('admin/admin')
})

router.get('/dashboard', (req, res) => {
  var api_key = 'thisismylife'
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
      <input type='hidden' id='key' name='key' value='${api_key}'>
      <input type='hidden' id='id' name='id' value='${result[0][i].id}'>
      <input type="submit" value="Complete" class='btn btn-outline-primary'/>
      </form></tr>`
    }
    res.render('admin/index-2',{
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

app.get('/post', (req, res) => {

})

module.exports = router;
