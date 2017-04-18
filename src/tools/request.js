var https = require("https");
var http = require("http");



var sendHttps = function(url, success, fail) {
    https.get(url, function(res) {
        var datas = [];
        var size = 0;
        res.on('data', function(data) {
            datas.push(data);
            size += data.length;
        });
        res.on("end", function() {
            var buff = Buffer.concat(datas, size);
            var result = buff.toString(); //不需要转编码,直接tostring  
            console.log(result);
            if (typeof success === "function") {
                success(result);
            }
        });
    }).on("error", function(err) {
        if (typeof fail === "function") {
            fail(err);
        }
    });
};

var sendHttp = function(url,success,fail) {
    var req = http.request(url, function(res){
        var datas = [];
        var size = 0;
        res.on('data', function(chunk){
            datas.push(data);
            size += data.length;
        });
        res.on('end', function(){
            var buff = Buffer.concat(datas, size);
            var result = buff.toString();
            console.log(result);
            if (typeof success === "function") {
                success(result);
            }
        });
    }).on('error', function(e){
        console.error(e);
    });
};

module.exports = {
    sendHttps: sendHttps,
    sendHttp: sendHttp
}