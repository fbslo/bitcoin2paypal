const express = require('express');
const router = express.Router();

//Load functions
const functions = require('../scripts/functions.js')

//connect to MySQL database
var con = require("../scripts/config.js")

// website.com/blog
router.get('/', (req, res) => {
  var sql = 'SELECT * FROM blog;'
  con.con.query(sql, function(err, result){
    var blog_top_date = functions.formatDate(result[result.length - 1].date)
    var blog_top = `<div class="col-md-12">
          <div class="blog-item bi-feature">
            <figure class="blog-thumb">
              <img src="img/blog/${result[result.length - 1].image}" alt="${result[result.length - 1].title}">
            </figure>
            <div class="blog-text">
              <div class="post-date">${blog_top_date}</div>
              <h4 class="blog-title"><a href="/blog/post?id=${result[result.length - 1].id}">${result[result.length - 1].title}</a></h4>
              <div class="post-meta">
                <a href=""><span>by</span> ${result[result.length - 1].author}</a>
                <a href=""><i class="fa fa-eye"></i> ${result[result.length - 1].views} views</a>
              </div>
              <p>${result[result.length - 1].blog}</p>
            </div>
          </div>
        </div>`

    var smaller_posts = ''
    //use i=1 to avoid first post that is already blog_top
    for (i=1; i<result.length; i++){
      var b = result.length - (i+1)
      var date = functions.formatDate(result[i].date)
      smaller_posts += `<div class="col-md-6">
        <div class="blog-item">
          <figure class="blog-thumb">
            <img src="img/blog/${result[b].image}" alt="">
          </figure>
          <div class="blog-text">
            <div class="post-date">${date}</div>
            <h4 class="blog-title"><a href="/blog/post?id=${result[b].id}">${result[b].title}</a></h4>
            <div class="post-meta">
              <a href=""><span>by</span> ${result[b].author}</a>
              <a href=""><i class="fa fa-eye"></i> ${result[b].views} Views</a>
            </div>
          </div>
        </div>
      </div>`
    }
    res.render('blog/blog_full', {
      blog_top: blog_top,
      smaller_posts: smaller_posts
    })
  })
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


module.exports = router;
