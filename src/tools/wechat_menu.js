var wechatApi = require("./wechat");
var redisUtil = require("./redis_util");
var config = require("../config.json");
var request = require('request');

var url = config.wechat_test.create_menu;
console.log(url);
//根据token从redis中获取access_token 
function getToken() {
	redisUtil.get("access_token_test").then(function(data) {
		console.log(data);
		//获取到值--往下传递  
		if (data) {
			return Promise.resolve(data);
		} else { //没获取到值--从微信服务器端获取,并往下传递  
			return wechatApi.updateTestAccessToken();
		}
	}).then(function(data) {
		console.log(data);
		//没有expire_in值--此data是redis中获取到的  
		if (!data.expires_in) {
			console.log('redis获取到token值');
			setMenu(data);
		} else { //有expire_in值--此data是微信端获取到的 
			/** 
			 * 保存到redis中,由于微信的access_token是7200秒过期, 
			 * 存到redis中的数据减少20秒,设置为7180秒过期 
			 */
			console.log('redis中无token值');
			
			redisUtil.set("access_token_test", data.access_token, 7180).then(function(result) {
				if (result == 'OK') {
					console.log("redis中已保存token值")
				}
			});
			setMenu(data.access_token);
		}
	});
}

var setMenu = function(token) {
	var url = config.wechat_test.create_menu.replace("{ACCESS_TOKEN}", token);
	var body = require("./menu.json");
	var option = {
		json: true,
		body: body,
		headers: {
			"Content-type": "application/json; charset=UTF-8",
			"Accept": "application/json; charset=UTF-8"
		}
	};
	request.post(url, option, function(error, response, body) {
		if (body.errcode == 0) {
			console.log("创建菜单成功");
		}
	});
};

getToken();