const request = require('request');
const fetch = require('node-fetch');

//connect to MySQL database
var database = require("../scripts/config.js")


async function getBalance(address){
  setTimeout(async function(){
	  let response = await fetch('http://blockchain.info/balance?active='+address)
	  let data = await response.json()
	  console.log(data)
	  return data;
  }, 2000)
}

async function loop(result){
	for(let i = 0; i<result.length; i++){
		getBalance(result[i].address)
	}
}

async function getUsers(){
	database.con.query("SELECT address FROM addresses;", function (err, result){
		if(!err){
			loop(result)
		} else {
			console.log("ERROR")
		}
	})
	database.con.end()
}


getUsers()
