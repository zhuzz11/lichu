var express = require('express');
var router = express.Router();

var util = require("../tools/mysql-query");

/* GET users listing. */
router.post('/login', function(req, res, next) {
  var name = req.body.name;
  var pwd = req.body.pwd;
  var sql = 'select * from users where name = "' + name + '" and passwd = "' + pwd + '"';
  util.query(sql).then(function(result){
  	if(result.length > 0){
  		res.end(JSON.stringify({resultCode:"000",userId:result[0].id}));
  	}else{
  		res.end(JSON.stringify({resultCode:"999",msg:"用户不存在!"}));
  	}
  },function(){
  	res.end(JSON.stringify({resultCode:"999",msg:"服务器异常，请稍后再试！"}));
  })

});






module.exports = router;
