const express = require('express');
const router = express.Router();

//Load functions
const functions = require('../scripts/functions.js')

//connect to MySQL database
var con = require("../scripts/config.js")

//Show landing page
router.get('/', (req, res) => {
  //get affiliate id from url (?ref=affiliate_id)
  var affiliate_id = req.query.ref
  var ref = req.query.ref 
  //check if affiliate id exisits
  if(affiliate_id != null || affiliate_id != undefined){
    //save new visit to database
    functions.saveAffiliateID(affiliate_id)
  }
  if(!affiliate_id){
    //new visitor, but not affiliate
    functions.saveAffiliateID('not_affiliate')
  }
  //get exchange rate
  var rate = functions.getExchangeRate();
  //get views & render file
  con.con.query("SELECT * FROM views;", function (err, result) {
    if(err){
      console.log('Error geting views!' + err)
      res.render('index', {
        rate: rate,
        views: 'NaN',
        views_btc: 'NaN',
        views_yemen: 'NaN',
		ref: ref
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
        res.render('index', {
          rate: rate,
          views: views,
          views_btc: btc,
          views_yemen: yemen,
		  ref: ref
        })
      }
    }
  });
});

module.exports = router;
