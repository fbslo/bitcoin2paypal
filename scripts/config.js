var mysql = require("mysql");
const fs = require('fs');


//Get credentials  from configuration file
let rawdata = fs.readFileSync('./config/config.json');
let config_json = JSON.parse(rawdata);
var { database_ip, database_user, database_password, database_port, database } = config_json

//create connection to MySQL database
var con = mysql.createConnection({
  host: database_ip,
  database: database,
  user: database_user,
  password: database_password,
  port: database_port,
  multipleStatements: true
});
//connect to MySQL database
con.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as ID: ' + con.threadId);
});

//create pool connect to MySQL database
var pool = mysql.createPool({
  host: database_ip,
  database: database,
  user: database_user,
  password: database_password,
  port: database_port,
  charset: 'utf8'
});

//keep the connection running
setInterval(() => {
    con.query('SELECT 1', (err, results) => {})
},5000)

module.exports = { con, pool };
