var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var entryRouter = require('./routes/entries');
const { lengthAbove, required } = require('./middleware/validate');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/* 
  路由规划
  路由有两种
  WebUI路由：
    get/post 显示留言板页面
    get/register 显示注册页面
    get/login 显示登陆页面
    get/register 显示注册页面
    get/post 显示创建新条目页面
    
  API路由：
    get/api/entries 获取所有的条目
    get/api/entries/page 获取单页的条目
    post/api/entry 创建留言条目
    post/api/register 创建新的用户账号
    get/api/logout 注销
    post/api/login 登陆
    
*/
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.get('/post', 
  entryRouter.form,
);
app.post('/post', 
  required(['title', 'body']),
  lengthAbove({title: 5}),
  entryRouter.submit
);
app.get('/list', entryRouter.list);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
