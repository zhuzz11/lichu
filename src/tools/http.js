var request = require('request');

var http ={};
//Promise化request  
http.request = function(opts) {
    opts = opts || {};
    return new Promise(function(resolve, reject) {
        request(opts, function(error, response, body) {

            if (error) {
                return reject(error);
            }
            resolve(body);
        });

    });
};

module.exports = http;