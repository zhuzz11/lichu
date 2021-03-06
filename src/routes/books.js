var express = require('express');
var router = express.Router();

var util = require("../tools/mysql-query");
var auth = require("../tools/auth.js");
var pageNum = 10;//每页的条数
/* GET home page. */
router.post('/', function(req, res, next) {

	if (!auth.checkAuth(req, res)) {
		return;
	}
	console.log(req.body);
	var userId = req.session ? req.session.userInfo.userId : "";
	var post = [userId, (req.body.page - 1) * pageNum, pageNum];
	var sql = "select contents.id,content,contents.date,title from contents where contents.userid = ? order by contents.date desc LIMIT ?,?";
	util.query(sql, post).then(function(result) {
		res.end(JSON.stringify({
			resultCode: "000",
			resultObject: result,
			userInfo: req.session.userInfo
		}));
	}, function(err) {
		res.end(JSON.stringify({
			resultCode: "999",
			msg: "获取失败，请稍后重试。"
		}));
	});

});

//get detaik book
router.get('/:bookId', function(req, res, next) {
	if (!auth.checkAuth(req, res)) {
		return;
	}
	var post = [req.params.bookId];
	var sql = 'select name,content,contents.date,title from contents,users where contents.userid = users.id and contents.id = ?';
	util.query(sql, post).then(function(result) {
		if (result.length === 0) {
			res.end(JSON.stringify({
				resultCode: "999",
				msg: "获取失败，请稍后重试。"
			}));
		} else {
			res.end(JSON.stringify({
				resultCode: "000",
				resultObject: result[0]
			}));
		}
	}, function(err) {
		res.end(JSON.stringify({
			resultCode: "999",
			msg: "获取失败，请稍后重试。"
		}));
	});

});

router.post('/upload', function(req, res) {
	if (!auth.checkAuth(req, res)) {
		return;
	}
	if (req.body.content.trim() === "" || req.body.content.length < 10) {
		res.end(JSON.stringify({
			resultCode: "999",
			msg: "正文内容长度太少，不能低于10个有效字符。"
		}));
		return;
	}
	var userId = req.session.userInfo.userId;
	var post = [userId, req.body.content, new Date().getTime(), req.body.title];
	var sql = 'insert into contents(userid, content, date,title) values(?,?,?,?)';
	util.query(sql, post).then(function(result) {
		res.end(JSON.stringify({
			resultCode: "000",
			msg: "发表成功！"
		}));
	}, function(err) {
		res.end(JSON.stringify({
			resultCode: "999",
			msg: "抱歉，插入日记失败！"
		}));
	});
});

module.exports = router;