var express = require('express');
var router = express.Router();
var crypto = require("crypto");

/* GET home page. */
router.get('/auth', function(req, res, next) {
	var token = req.query.token,
		timestamp = req.query.timestamp,
		nonce = req.query.nonce,
		echostr = req.query.echostr;
		console.log(echostr+"---"+ timestamp+"---"+  nonce+"---"+  token)
	if (isLegel(echostr, timestamp, nonce, token)) {
		res.send(echostr);
	} else {
		res.send("失败");
	}
});

function isLegel(signature, timestamp, nonce, token) {
	var array = new Array();
	array[0] = timestamp;
	array[1] = nonce;
	array[2] = token;
	array.sort();
	var hasher = crypto.createHash("sha1");
	var msg = array[0] + array[1] + array[2];
	hasher.update(msg);
	var msg = hasher.digest('hex'); //计算SHA1值
	if (msg == signature) {
		return true;
	} else {
		return false;
	}
}

module.exports = router;