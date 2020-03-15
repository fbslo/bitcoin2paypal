const express = require('express');
const router = express.Router();

//Load functions
const functions = require('../scripts/functions.js')

//connect to MySQL database
var con = require("../scripts/config.js")

// website.com/blog
router.get('/', (req, res) => {
  // TODO: Load all posts
  res.redirect('/blog/how-to-buy-bitcoin')
})

router.get('/post', (req, res) => {
  var id = req.query.id
  if(!id){
    res.send("This post does not exist!")
  }
  else {
    var sql = 'SELECT * FROM blog WHERE id=?; SELECT * FROM BLOG;'
    con.con.query(sql, id, function(err, result){
      if(err) {
        res.send("Error while getting post, please try again later or contact support!")
      } else {
        //check if result exisits
        if(result){
          try {
            //get details of main post
            var body = result[0][0].blog
            var title = result[0][0].title
            var author = result[0][0].author
            var date = functions.formatDate(result[0][0].date)
            var views = result[0][0].views
            var image = result[0][0].image
            //update number of views
            functions.updateViews(id, views)
            //get detals od last 2 posts (for 'You May Also Like')
            var last_views = result[1][result[1].length - 1].views
            var last_title = result[1][result[1].length - 1].title
            var last_author = result[1][result[1].length - 1].author
            var last_date = functions.formatDate(result[1][result[1].length - 1].date)
            var last_id = result[1][result[1].length - 1].id
            var last_image = result[1][result[1].length - 1].image

            var second_views = result[1][result[1].length - 2].views
            var second_title = result[1][result[1].length - 2].title
            var second_author = result[1][result[1].length - 2].author
            var second_date = functions.formatDate(result[1][result[1].length - 2].date)
            var second_id = result[1][result[1].length - 2].id
            var second_image = result[1][result[1].length - 2].image
            //render website
            res.render('blog/post', {
              id: id,
              body: body,
              title: title,
              author: author,
              date: date,
              views: views + 1,
              image: image,
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
              second_image: second_image
            })
          } catch (err){
            res.send("Error, please post at least 3 blog posts")
          }
        } else {
          //blog does not exisits
          res.send("This post does not exisit!")
        }
      }
    })
  }
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
