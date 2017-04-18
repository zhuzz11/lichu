var request = require("./request");
var config = require("../config.json");

var appid = config.wechat.appid;
var appSecret = config.wechat.appSecret;


var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appid + "&secret=" + appSecret;
var accessToken = "meXofTTa7JI4CZFIcsigeWplUC6OKUet5m1sUYi-bHvXJw04qOznpKiGBU-ynB8ClE5Yv5uRAy0E1VsN_KxyuHh9tcDFv5Lm3G3tqsMrpJYeFgdkC3I_MD0oQXela7H9WDRfAEAQXL";

var accessToken = function() {
    request.sendHttps(url, function(data) {
        accessToken = JSON.parse(data).access_token;
    }, function(err) {
        console.log("fail");
        console.log(err);
    });
};

var url_ticket = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + accessToken + "&type=jsapi";
var jsapi_ticket = "";

var ticket = function(){
	request.sendHttps(url_ticket, function(data) {
        jsapi_ticket = JSON.parse(data).ticket;
    }, function(err) {
        console.log("fail");
        console.log(err);
    });
};

ticket();