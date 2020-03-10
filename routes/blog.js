const express = require('express');
const router = express.Router();

//Load functions
const functions = require('../scripts/functions.js')

//connect to MySQL database
var con = require("../scripts/config.js")

// website.com/blog
router.get('/', (req, res) => {
  res.redirect('/blog/how-to-buy-bitcoin')
})


// website.com/blog
router.get('/how-to-buy-bitcoin', (req, res) => {
  //get Views
  con.con.query("SELECT * FROM views;", function (err, result) {
    if(err){
      console.log('Error geting views!' + err)
      res.render('blog/buy-btc-anon', {
        views: 'NaN',
        views_btc: 'NaN',
        views_yemen: 'NaN'
      })
    } else {
      //check if affiliate id exisits in the database
      if(result[0] == undefined){
        console.log('Cannot getViews, result is undefined')
      } else {
        //return result
        views = result[1].views
        btc = result[0].views
        yemen = result[2].views
        //render file
        res.render('blog/buy-btc-anon', {
          views: views,
          views_btc: btc,
          views_yemen: yemen
        })
        var new_views = Number(btc) + 1
        functions.updateViews('how_to_buy_bitcoin', new_views)
      }
    }
  });
})

// website.com/blog
router.get('/paypal-credit', (req, res) => {
  //get Views
  con.con.query("SELECT * FROM views;", function (err, result) {
    if(err){
      console.log('Error geting views!' + err)
      res.render('blog/paypal', {
        views: 'NaN',
        views_btc: 'NaN',
        views_yemen: 'NaN'
      })
    } else {
      //check if affiliate id exisits in the database
      if(result[0] == undefined){
        console.log('Cannot getViews, result is undefined')
      } else {
        //return result
        views = result[1].views
        btc = result[0].views
        yemen = result[2].views
        //render file
        res.render('blog/paypal', {
          views: views,
          views_btc: btc,
          views_yemen: yemen
        })
        var new_views = Number(views) + 1
        functions.updateViews('paypal', new_views)
      }
    }
  });
})


// website.com/blog
router.get('/yemen-civil-war-crypto', (req, res) => {
  //get Views
  con.con.query("SELECT * FROM views;", function (err, result) {
    if(err){
      console.log('Error geting views!' + err)
      res.render('blog/yemen', {
        views: 'NaN',
        views_btc: 'NaN',
        views_yemen: 'NaN'
      })
    } else {
      //check if affiliate id exisits in the database
      if(result[0] == undefined){
        console.log('Cannot getViews, result is undefined')
      } else {
        //return result
        views = result[1].views
        btc = result[0].views
        yemen = result[2].views
        //render file
        res.render('blog/yemen', {
          views: views,
          views_btc: btc,
          views_yemen: yemen
        })
        var new_views = Number(yemen) + 1
        functions.updateViews('yemen', new_views)
      }
    }
  });
})

module.exports = router;
