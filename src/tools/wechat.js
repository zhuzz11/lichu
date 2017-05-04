/* 
 *微信相关操作api 
 */
var wechatApi = {};
var crypto = require('crypto');
var utils = require("./http");
var config = require("../config.json");

var access_url = config.wechat.accessToken_url;
var ticket_url = config.wechat.ticket_url;

var appid = config.wechat.appid;
var appSecret = config.wechat.appSecret;
var appid_test = config.wechat_test.appid;
var appSecret_test = config.wechat_test.appSecret;

var createNonceStr = function() {
    return Math.random().toString(36).substr(2, 15);
};

var createTimestamp = function() {
    return parseInt(new Date().getTime() / 1000) + '';
};

var raw = function(args) {
    var keys = Object.keys(args);
    keys = keys.sort()
    var newArgs = {};
    keys.forEach(function(key) {
        newArgs[key.toLowerCase()] = args[key];
    });

    var string = '';
    for (var k in newArgs) {
        string += '&' + k + '=' + newArgs[k];
    }
    string = string.substr(1);
    return string;
};

/**
 * @synopsis 签名算法 
 *
 * @param jsapi_ticket 用于签名的 jsapi_ticket
 * @param url 用于签名的 url ，注意必须动态获取，不能 hardcode
 *
 * @returns
 */
wechatApi.sign = function(jsapi_ticket, url) {
    var ret = {
        jsapi_ticket: jsapi_ticket,
        nonceStr: createNonceStr(),
        timestamp: createTimestamp(),
        url: url
    };
    var string = raw(ret);
    var hasher = crypto.createHash("sha1");
    hasher.update(string);
    ret.signature = hasher.digest('hex'); //计算SHA1值
    ret.appid = appid;
    return ret;
};

//获取access_token  
wechatApi.updateAccessToken = function() {
    //console.log(url);  
    var option = {
        url: access_url.replace("{appid}", appid).replace("{secret}", appSecret),
        json: true
    };
    return utils.request(option).then(function(data) {
        return Promise.resolve(data);
    });
};

wechatApi.updateTestAccessToken = function() {
    //console.log(url);  
    var option = {
        url: access_url.replace("{appid}", appid_test).replace("{secret}", appSecret_test),
        json: true
    };
    return utils.request(option).then(function(data) {
        return Promise.resolve(data);
    });
};

wechatApi.updateAccessTicket = function(access_token) {
    var option = {
        url: ticket_url.replace("{access_token}", access_token),
        json: true
    };
    return utils.request(option).then(function(data) {
        return Promise.resolve(data);
    });
};

module.exports = wechatApi;