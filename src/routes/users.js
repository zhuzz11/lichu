var express = require('express');
var router = express.Router();

var util = require("../tools/mysql-query");

/* login. */
router.post('/login', function(req, res, next) {
  var name = req.body.name;
  var pwd = req.body.pwd;
  var post = [name, pwd];
  var sql = 'select * from users where name = ? and passwd = ?';
  util.query(sql, post).then(function(result) {
    if (result.length > 0) {
      req.session.userInfo = {
        userId: result[0].id,
        userName: result[0].name,
        userClass: result[0].class
      };
      res.end(JSON.stringify({
        resultCode: "000",
        userId: result[0].id
      }));
    } else {
      res.end(JSON.stringify({
        resultCode: "999",
        msg: "账号或密码错误！"
      }));
    }
  }, function() {
    res.end(JSON.stringify({
      resultCode: "999",
      msg: "服务器异常，请稍后再试！"
    }));
  });

});

/* logout. */
router.get('/logout', function(req, res, next) {
  req.session.userInfo = null;
  res.end(JSON.stringify({
    resultCode: "000",
    msg: "退出成功"
  }));

});

/* register. */
router.post('/register', function(req, res, next) {
  var body = req.body;
  var name = body.name;
  if (/\s/.test(name)) {
    res.end(JSON.stringify({
      resultCode: "999",
      msg: "账号不能含空字符！"
    }));
    return;
  }
  if (name.length < 1 || name.length > 10) {
    res.end(JSON.stringify({
      resultCode: "999",
      msg: "账号长度不符！"
    }));
    return;
  }
  var pwd = body.pwd;
  if (!/^[a-zA-Z0-9_!@#$%^&*()-\\+]{6,15}$/.test(pwd)) {
    res.end(JSON.stringify({
      resultCode: "999",
      msg: "密码不符规范！"
    }));
    return;
  }
  var pwd2 = body.confirm_pwd;
  if (pwd != pwd2) {
    res.end(JSON.stringify({
      resultCode: "999",
      msg: "两次输入的密码不一致！"
    }));
    return;
  }
  var post = [name, pwd, new Date().getTime()];
  var exist = 'select name from users where name = ?';
  var sql = 'insert into users(name,passwd,date) values (?, ?,?)';
  util.query(exist, [name]).then(function(result) {
    if (result.length > 0) {
      res.end(JSON.stringify({
        resultCode: "999",
        msg: "账号已注册，请换个试试"
      }));
    } else {
      util.query(sql, post).then(function(result) {
        res.end(JSON.stringify({
          resultCode: "000",
          msg: "注册成功！"
        }));
      }, function(err) {
        res.end(JSON.stringify({
          resultCode: "999",
          msg: "服务器异常，请稍后再试！"
        }));
      });
    }
  });

});



module.exports = router;