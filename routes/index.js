const express = require('express');
const router = express.Router();
const fs = require('fs');

//Load functions
const functions = require('../scripts/functions.js')

//connect to MySQL database
var con = require("../scripts/config.js")

//Show landing page
router.get('/', (req, res) => {
  //get number of transactions from config.json
  let rawdata = fs.readFileSync('./config/config.json');
  let tx_number_raw = JSON.parse(rawdata);
  var tx_number = tx_number_raw.tx_number
  //get affiliate id from url (?ref=affiliate_id)
  var affiliate_id = req.query.ref
  var ref = req.query.ref
  var ip_raw = req.ip || req.ips || req.connection.remoteAddress
  var ip = ip_raw.replace('::ffff:', '');
  //check if affiliate id exisits
  if(affiliate_id != null || affiliate_id != undefined){
    //save new visit to database
    functions.saveAffiliateID(affiliate_id)
  }
  if(!affiliate_id){
    //new visitor, but not affiliate
    functions.saveAffiliateID('not_affiliate')
  }
  //add new visitor to database
  functions.newVisitor(ip, affiliate_id) //log new visitor to the database
  //get exchange rate
  var rate = functions.getExchangeRate();
  //get views & render file
  con.con.query("SELECT * FROM blog;", function (err, result) {
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
        var last_views = result[result.length - 1].views
        var last_title = result[result.length - 1].title
        var last_author = result[result.length - 1].author
        var last_date = functions.formatDate(result[result.length - 1].date)
        var last_id = result[result.length - 1].id
        var last_image = result[result.length - 1].image

        var second_views = result[result.length - 2].views
        var second_title = result[result.length - 2].title
        var second_author = result[result.length - 2].author
        var second_date = functions.formatDate(result[result.length - 2].date)
        var second_id = result[result.length - 2].id
        var second_image = result[result.length - 2].image

        var third_views = result[result.length - 3].views
        var third_title = result[result.length - 3].title
        var third_author = result[result.length - 3].author
        var third_date = functions.formatDate(result[result.length - 3].date)
        var third_id = result[result.length - 3].id
        var third_image = result[result.length - 3].image
        //render file
        res.render('index', {
          rate: rate,
		      ref: ref,
          tx_number: tx_number,
          last_title: last_title,
          last_date: last_date,
          last_author: last_author,
          last_date: last_date,
          last_id: last_id,
          last_views: last_views,
          last_image: last_image,
          second_date: second_date,
          second_title: second_title,
          second_views: second_views,
          second_author: second_author,
          second_id: second_id,
          second_image: second_image,
          third_id: third_id,
          third_title: third_title,
          third_author: third_author,
          third_date: third_date,
          third_views: third_views + 1,
          third_image: third_image
        })
      }
    }
  });
});

module.exports = router;
