// 启动的核心文件
var createError = require('http-errors'); //导入http错误模块
var express = require('express'); //导入express模块
var path = require('path'); //导入node自带的路径模块
var cookieParser = require('cookie-parser');  //处理cookie
var logger = require('morgan'); //记录服务器日志文件
var session = require("express-session");

var connection  = require("./utils/connect");

// 引入ws模块文件
require("./utils/webSocket");
// 路由模块
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var commentRouter = require('./routes/comment');
var vueRouter = require('./routes/vue');
var reactRouter = require("./routes/react")

var cors = require("cors");
var app = express();  //app包含了express所有的api
var {
  checkToken
} = require("./utils")

// view engine setup
app.set('views', path.join(__dirname, 'views'));  //views文件路径设置为绝对的_dirname根路径 views === /
app.set('view engine', 'ejs');  //ejs 设置模板引擎(也可以设置html引擎)

// CORS policy: No 'Access-Control-Allow-Origin'  服务器加密协议
app.use(cors());  //解决跨域问题  重置协议  服务器没有任何安全协议

app.use(logger('dev')); //日志打印
app.use(express.json());  //获取表单post提交或者ajax post传递的参数(formData)
app.use(express.urlencoded({ extended: false })); //(req.body获取post请求的参数)
app.use(cookieParser());  //设置服务器的cookie
app.use(express.static(path.join(__dirname, 'public')));  //加载静态文件(express.static)  服务器的静态资源  public === /

console.log("ss")
// 自定义的一个中间件
app.use(function(req, res, next){
  // console.log("一直触发....");
  next(); //进入下一步中间件
});

// session 中间件  必须写在路由中间件前面 （用来保存用户登录后的数据）
app.use(session({
  name:"AppTest",
  cookie:{maxAge:1000*60*60},  // session 时长 1小时
  secret:"test",
  resave:false,
  saveUninitialized:true
}))

//设置路由中间件  app.use("路由别名",路由模块)
app.use('/', indexRouter);  //路由正确，执行成功，不会进入下一步中间件中
app.use('/users', usersRouter); //区别各个模块之前的名字冲突
app.use('/comment', commentRouter); //新增的评论路由
app.use("/react", reactRouter); //新增的react路由
// app.use(checkToken);
app.use('/vue', vueRouter);


// catch 404 and forward to error handler 捕捉404，并带到下一个中间件
// req    请求
// res    响应
// next   表示进入下一个中间件



// 自定义的中间件
app.use(function(req, res, next){
  console.log("这是一个自定义的中间件");
  next();
});

app.use(function(req, res, next) {
  console.log(404); 
  next(createError(404)); //http状态码
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  // 最后一个中间件不需要写next
});

module.exports = app;
