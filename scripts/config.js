var mysql = require("mysql");

var database_ip = 'database.com'
var database_user = 'user_name'
var database_password = 'user_password'
var database_port = 3306
var database = 'exchange'

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
