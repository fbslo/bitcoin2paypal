const request = require('request');
const con = require("../scripts/config.js")

var QRCode = require('qrcode');
var base64Img = require('base64-img');

var fs = require('fs')

//Get data from configuration file
let rawdata = fs.readFileSync('./config/config.json');
let config_json = JSON.parse(rawdata);

module.exports = {
  getLatestVerson: function getLatestVerson(){
    request('https://json.com/fbslo', { json: true }, (error, response, body) => {
      if(error) {
        console.log('Unable to get latest version! Your version is: ', config_json.version)
      } else {
        if(!body){
          console.log('Unable to get latest version! Your version is: ', config_json.version)
        } else {
          var latest = body.latest
          if(config_json.version != latest){
            console.log("Latest version is "+latest+", but you are using "+config_json.version+"! \nPlease update your app!")
          } else {
            console.log("You have latest version of this app! Your version is: ", config_json.version)
          }
        }
      }
    });
  },
  //secret generator function
  generateHexString: function generateHexString(length) {
    var ret = "";
    while (ret.length < length) {
      ret += Math.random().toString(16).substring(2);
    }
    return ret.substring(0,length);
  },
  getQrCode: function getQrCode(address, amount){
    QRCode.toDataURL('bitcoin:' + address + '?amount='+amount, { errorCorrectionLevel: 'H' }, function (err, url) {
      base64Img.img(url, 'dest', address, function(err, filepath) {
        var qr = filepath.substring(4)
        return qr;
      })
    })
  },
  getExchangeRate: function getExchangeRate(){
    var rate = config_json.rate
    return rate;
  },
  saveAffiliateID: function saveAffiliateID(id){
    var id_sql = [[id]];
    con.con.query("SELECT * FROM affiliate WHERE affiliate_id = ?;", id_sql, function (err, result) {
      if(err){
        console.log('Error updating refferal ID' + err)
      } else {
        //check if affiliate id exisits in the database
        if(result[0] == undefined){
          addNewAffiliateID(id)
        } else {
          //get new number of clicks
          var clicks_new = Number(result[0].clicks) + 1
          //update number of clicks
          var sql = "UPDATE affiliate SET clicks = '"+clicks_new+"' WHERE affiliate_id = ?";
          con.con.query(sql, id_sql, function (err, result) { //insert data to MySQL database
            if (err) throw err;
            console.log("New Click for: " + id + '! Total clicks: ' + clicks_new)
          });
        }
      }
    });
    function addNewAffiliateID(id){
      var clicks = 1
      var other = 'Auto-created'
      var sql = "INSERT INTO affiliate (affiliate_id, clicks, other) VALUES ?";
      var values = [[id, clicks, other]];
      con.con.query(sql, [values], function (err, result) { //insert data to MySQL database
        if (err) throw err;
        console.log("New affiliate ID: " + values)
      });
    }
  },
  updateViews: function updateViews(id, clicks){
    //get new number of clicks
    views_new = clicks + 1
    //update number of clicks
    var sql = "UPDATE blog SET views = '"+views_new+"' WHERE id = '"+id+"'";
    con.con.query(sql, function (err, result) { //insert data to MySQL database
      if (err) throw err;
      console.log("New views for post: " + id + '! Total clicks: ' + views_new);
    });
  },
  newVisitor: function newVisitor(ip, affiliate){
    var time = new Date;
    if(!affiliate){
      let affiliate = 'not_affiliate'
      var sql = "INSERT INTO visitors (ip, time, affiliate) VALUES ?";
      var values = [[ip, time, affiliate]];
      con.con.query(sql, [values], function(err, result){
        if (err){console.log("error adding new visitor")}
        else{console.log("New visitor! IP: " + ip)}
      })
    } else {
      var sql = "INSERT INTO visitors (ip, time, affiliate) VALUES ?";
      var values = [[ip, time, affiliate]];
      con.con.query(sql, [values], function(err, result){
        if (err){console.log("error adding new visitor")}
        else{console.log("New visitor! IP: " + ip)}
      })
    }
  },
  formatDate: function formatDate(d) {
    var date = new Date(d);
    if ( isNaN( date .getTime() ) )
    {
      return d;
    }
    else{
    var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sept";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";

    day = date.getDate();

    if(day < 10){
      day = "0"+day;
    }
    return day  + " " +month[date.getMonth()] + " " + date.getFullYear();
    }
  }
}
