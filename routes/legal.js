const express = require('express');
const router = express.Router();

//Load functions
const functions = require('../scripts/functions.js')

//connect to MySQL database
var con = require("../scripts/config.js")

router.get('/', (req, res) => {
	res.redurect('/privacy-policy');
})

router.get('/terms-and-conditions', (req, res) => {
	res.render('terms');
})

router.get('/privacy-policy', (req, res) => {
	res.render('privacy');
})


module.exports = router;
