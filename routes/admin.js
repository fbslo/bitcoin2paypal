const express = require('express');
const router = express.Router();

const request = require('request');


//Load functions
const functions = require('../scripts/functions.js')

//connect to MySQL database
var database = require("../scripts/config.js")

//Show admin page
router.get('/', (req, res) => {
  //html string that will be send to browser
  var reo ='<html><head><title>Admin Panel</title></head><body><a href="/admin?president=itsmylife">Admin</a> - <a href="/admin?president=itsmylife&type=refferal">Refferal</a> - <a href="/admin?president=itsmylife&type=message">Messages</a><h1>Admin Panel</h1>{${table}}</body></html>';

  //sets and returns html table with results from sql select
  //Receives sql query and callback function to return the table
  function setResHtml(sql, cb){
    database.pool.getConnection((err, con)=>{
      if(err){
        console.log("Error with admin page! database.pool.getConnection")
        res.status(500)
        res.render('errors/500')
      } else{
        con.query(sql, (err, res, cols)=>{
          if(err){
            console.log("Error with admin page! con.query()")
            res.status(500)
            res.render('errors/500')
          }
          var table =''; //to store html table

          //create html table with data from res.
          for(var i=0; i<res.length; i++){
				table +='<tr><td>'+ (i+1) +'</td><td>'+ res[i].id +'</td><td>'+ res[i].amount +'</td><td>'+ res[i].email +'</td><td>'+ res[i].date +'</td><td>'+ res[i].address +'</td><td>'+res[i].refferal +'</td><td>'+res[i].ip+'</td><td>'+ res[i].receive+'</td><td><button><a href="https://blockchain.info/rawaddr/'+ res[i].address +'">Check</a></button></td></tr>';
          }
          table ='<table border="1"><tr><th>Nr.</th><th>ID</th><th>Amount</th><th>Email</th><th>date</th><th>Address</th></th><th>Affiliate</th><th>IP</th><th>Receive</th><th>Balance</th></tr>'+ table +'</table>';

          con.release(); //Done with mysql connection

          return cb(table);
        });
      }
    });
  }

  //for refferal
  //Receives sql query and callback function to return the table
  function refferal(sql, cb){
    database.pool.getConnection((err, con)=>{
      if(err){
        console.log("Error with admin page! database.pool.getConnection")
        res.status(500)
        res.render('errors/500')
      } else{
        con.query(sql, (err, res, cols)=>{
          if(err){
            console.log("Error with admin page! con.query()")
            res.status(500)
            res.render('errors/500')
          }
          var table =''; //to store html table

          //create html table with data from res.
          for(var i=0; i<res.length; i++){
			    setTimeout( function (i) {
					table +='<tr><td>'+ (i+1) +'</td><td>'+ res[i].affiliate_id +'</td><td>'+ res[i].clicks +'</td><td>'+ res[i].other +'</td></tr>';
				}, 2500 * i, i);
		  }
          table ='<table border="1"><tr><th>Nr.</th><th>Affiliate ID</th><th>Clicks</th><th>Other</th></tr>'+ table +'</table>';

          con.release(); //Done with mysql connection

          return cb(table);
        });
      }
    });
  }

  //for messages
  //Receives sql query and callback function to return the table
  function messages(sql, cb){
    database.pool.getConnection((err, con)=>{
      if(err){
        console.log("Error with admin page! database.pool.getConnection")
        res.status(500)
        res.render('errors/500')
      } else{
        con.query(sql, (err, res, cols)=>{
          if(err){
            console.log("Error with admin page! con.query()")
            res.status(500)
            res.render('errors/500')
          }
          var table =''; //to store html table

          //create html table with data from res.
          for(var i=0; i<res.length; i++){
            table +='<tr><td>'+ (i+1) +'</td><td>'+ res[i].name +'</td><td>'+ res[i].email +'</td><td>'+ res[i].phone +'</td><td>'+ res[i].message +'</td><td>'+ res[i].date +'</td></tr>';
          }
          table ='<table border="1"><tr><th>Nr.</th><th>Name</th><th>Email</th><th>Phone</th><th>Message</th><th>Date</th></tr>'+ table +'</table>';

          con.release(); //Done with mysql connection

          return cb(table);
        });
      }
    });
  }

  //buttons
  var button = '<a href="/admin?president=itsmylife">Exchnage</a> <a href="/admin?president=itsmylife?type=refferal">Affiliate</a> <a href="/admin?president=itsmylife?type=message">Message</a><p>'
  //get password
  var password = req.query.president
  //get type
  var type = req.query.type
  //check if password is correct
  if(password == 'itsmylife'){
    if(!type){
      let sql ='SELECT * FROM exchange ORDER BY date'; //id, email, amount, date, address
      setResHtml(sql, resql=>{
        reo = reo.replace('{${table}}', resql);
        res.send(reo);
      });
    }
    if(type == 'refferal'){
      let sql ='SELECT * FROM affiliate ORDER BY clicks'; //get affiliates and clicks
      refferal(sql, resql=>{
        reo = reo.replace('{${table}}', resql);
        res.send(reo);
      });
    }
    if(type == 'message'){
      let sql ='SELECT * FROM message'; //get messages
      messages(sql, resql=>{
        reo = reo.replace('{${table}}', resql);
        res.send(reo);
      });
    }
  } else {
    res.status(404)
    res.render('errors/404')
  }
});

module.exports = router;
