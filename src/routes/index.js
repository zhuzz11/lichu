var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //生产环境
  //res.render('index', { title: 'ZDM\'s website' });
  //dev 环境
  res.render('index-dev', { title: 'ZDM\'s website' });
});

module.exports = router;
