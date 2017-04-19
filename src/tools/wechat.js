
/* 
 *微信相关操作api 
 */
var wechatApi = {};

var utils = require("./http");
var config = require("../config.json");

var access_url = config.wechat.accessToken_url;
var ticket_url = config.wechat.ticket_url;

var appid = config.wechat.appid;
var appSecret = config.wechat.appSecret;

//获取access_token  
wechatApi.updateAccessToken = function() {
    //console.log(url);  
    var option = {
        url: access_url.replace("{appid}",appid).replace("{secret}",appSecret),
        json: true
    };
    return utils.request(option).then(function(data) {
        return Promise.resolve(data);
    });
};

wechatApi.updateAccessTicket = function(access_token) {
    var option = {
        url: ticket_url.replace("{access_token}",access_token),
        json: true
    };
    return utils.request(option).then(function(data) {
        return Promise.resolve(data);
    });
};

module.exports = wechatApi;