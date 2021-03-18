var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  /* 
    将数据传给模板的方式有三个：res.render传参 > res.locals > app.locals
    express默认只会向router传入一个程序级的变量，settings。是通过app.set()设置的
    app.locals.setting = app.settings
  */ 
  res.render('index', { title: 'Express' });
});

module.exports = router;
