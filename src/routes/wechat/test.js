var express = require('express');
var router = express.Router();
var crypto = require("crypto");
var redisUtil = require("../../tools/redis_util");
var wechatApi = require("../../tools/wechat");
var config = require("../../config.json");

//获取,验证access_token,存入redis中 
var checkAccessToken = function(req, res, next) {

	//根据token从redis中获取access_token  
	redisUtil.get("access_token_test").then(function(data) {
		//获取到值--往下传递  
		if (data) {
			return Promise.resolve(data);
		} else {//没获取到值--从微信服务器端获取,并往下传递  
			return wechatApi.updateTestAccessToken();
		}
	}).then(function(data) {
		console.log(data);
		//没有expire_in值--此data是redis中获取到的  
		if (!data.expires_in) {
			console.log('redis获取到token值');
			req.accessToken = data;
			next();
		} else {//有expire_in值--此data是微信端获取到的 
			/** 
			 * 保存到redis中,由于微信的access_token是7200秒过期, 
			 * 存到redis中的数据减少20秒,设置为7180秒过期 
			 */ 
			console.log('redis中无token值');
			redisUtil.set("access_token_test", data.access_token, 7180).then(function(result) {
				if (result == 'OK') {
					req.accessToken = data.access_token;
					next();
				}
			});
		}
	});
};

//获取,验证jsapi_ticket,存入redis中 
var checkTicket = function(req, res, next) {

	//根据token从redis中获取access_token  
	redisUtil.get("jsapi_ticket_test").then(function(data) {
		//获取到值--往下传递  
		if (data) {
			return Promise.resolve(data);
		} else {//没获取到值--从微信服务器端获取,并往下传递  
			return wechatApi.updateAccessTicket(req.accessToken);
		}
	}).then(function(data) {
		console.log(data);
		//没有expire_in值--此data是redis中获取到的  
		if (!data.expires_in) {
			console.log('redis获取到ticket值');
			req.accessTicket = data;
			next();
		} else {//有expire_in值--此data是微信端获取到的 
			console.log('redis中无ticket值');
			redisUtil.set("jsapi_ticket_test", data.ticket, 7180).then(function(result) {
				if (result == 'OK') {
					req.accessTicket = data.ticket;
					next();
				}
			});
		}
	});
};

//路由中间件 
router.use(checkAccessToken,checkTicket);

/* 微信验证. */
router.get('/auth', function(req, res, next) {
	var signature = req.query.signature,
		timestamp = req.query.timestamp,
		nonce = req.query.nonce,
		echostr = req.query.echostr;
	console.log("token=" + config.wechat_test.token);
	console.log(echostr + "---" + timestamp + "---" + nonce + "---" + signature);
	if (isLegel(signature, timestamp, nonce, config.wechat_test.token)) {
		res.send(echostr);
	} else {
		res.send("失败");
	}
});

/* 微信jssdk授权*/
router.get('/jssdk/sign', function(req, res, next) {
	console.log(req.accessTicket);
	console.log(req.query.url);
	var ret = wechatApi.sign(req.accessTicket,req.query.url);
	res.send(ret);
});

/* 微信测试. */
router.get('/t', function(req, res, next) {
	console.log("test page");
	res.render("test");
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