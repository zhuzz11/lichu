var express = require('express');
var router = express.Router();

var util = require("../tools/mysql-query");

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("sesion:" + JSON.stringify(req.session));
  if(!req.session.userInfo){
  	res.end(JSON.stringify({resultCode:402,msg:"你没有访问权限。"}));
  	return;
  }

  var userId = req.session ? req.session.userInfo.userId : "";
  var sql = "select contents.id,content,contents.date,title from contents,users where contents.userid = "+ userId + " order by contents.date desc";
  util.query(sql).then(function(result){
  	res.end(JSON.stringify(result));
  	console.log(result);
  },function(err){

  });
  
});

//get detaik book
router.get('/:bookId', function(req, res, next) {
	var id = req.params.bookId;
  util.query('select name,content,contents.date,title from contents,users where contents.userid = users.id and contents.id = ' + id + ' order by contents.date desc').then(function(result){

  	res.end(JSON.stringify(result));
  	console.log(result);
  },function(err){

  });
  
});

router.post('/upload',function(req,res){
	console.log(JSON.stringify(req.body));
	console.log("in upload===========");
	var query1 = 'select id from users where name = "' + req.body.name+'"';
	

	util.query(query1).then(function(result){
		console.log("id ===========" + result);
		var insert = 'insert into contents(userid, content, date,title) values(' + result[0].id + ',"' + req.body.content + '",' + new Date().getTime() +',"'+ req.body.title + '")';
		util.insert(insert).then(function(result){
			res.end(JSON.stringify({resultCode:"000",msg:"发表成功！"}));
		},function(err){
			res.end(JSON.stringify({resultCode:"999",msg:"抱歉，插入日记失败！"}));
		});

	},function(err){
		res.end(JSON.stringify({resultCode:"999",msg:"用户验证失败！"}));
	});
	
	
});

module.exports = router;