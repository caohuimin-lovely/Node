var express = require('express');
var router = express.Router();  //exxpress内置Router模块
// 路由文件 可以知道写了哪些接口
// 明白express路由
// 根据路由路径加载对应路由数据
const {
  User,
  Mv
} = require("../utils/model");

let {
  checkSession
} = require("../utils");  //index省略

/* GET home page. */
// router  路由模块，实现动态路由数据交互（页面json字符串）
// get get请求
// '/' 路由路径(req.url)
// req 请求信息
// res 响应数据 (res.render res.send  res.json  res.redirect)
// next进入下一个中间件
// render 服务器端渲染
router.get('/', function(req, res, next) {
  res.render('./index.ejs', {
    title : "Express",
    msg:"NZ1903---daydayup",
    flag:!!1,
    username: "zhangsan",
    oh:"<h2>hello world</h2>",
    course:["Node", "Vue", "React", "Angular"]
  });
});

router.get("/home",(req,res)=>{
  res.render("home",{
    username:req.session.username 
  })
})

router.get("/login", (req,res) => {
  // ?查询参数 req.query
  let username = req.query.username || "";
  res.render("login",{username:username});
});

// 显示ejs文件，必须配置路由   执行render渲染
router.get("/zhuce", (req, res) => {
  res.render("zhuce");
});

router.get("/logout", (req, res) => {
  //用户退出
  req.session.destroy(() => {
    res.redirect("/home");
  })
})

router.get("/movie", (req, res) => {
  const query = req.query;  //获取到地址栏?后面的内容
  console.log(query);
  let seachObj = {};  //搜索条件
  let sortObj = {}; //排序条件
  if(query['keyword']){ //判断
    let keyword = query["keyword"];
    seachObj = {
      $or:[ //或查询
        {title : new RegExp(keyword)},
        {year : new RegExp(keyword)},
        {genres : new RegExp(keyword)}
      ]
    }
  }else{
    sortObj = query;
  }
  // checkSession判断是否登录
  checkSession(req, res,() => {
    Mv.find(seachObj,{_id:0})
    .sort(sortObj)
    .then(result => {
      // console.log(result);
      res.render("movie",{result});
    })
  })
})


router.get("/my", (req, res) => {
  if(req.session.username){ //已经登录
    User.findOne({
      username:req.session.username
    }).then(result => {
      console.log(result);
      res.render("my", {result}); //对象 key-value相同时可以直接合并简写
    })
  }else{
    res.send(`<script>alert("你的登录已经失效，请重新登录");location.href='/login'</script>`)
  }
});

router.get("/resetpwd", (req, res) => {
  if(req.session.username){ //表示是登录状态
    User.findOne({
      username:req.username
    }).then(result => {
      res.render("resetpwd");
    })
  }else{
    res.send(`<script>alert("你的登录已经失效，请重新登录");location.href='/login'</script>`)
  }
  
})

router.get("/chat", (req, res) => {
  checkSession(req, res, () => {
    res.render("chat")
  })
})

// router.get("/nz1903", (req, res) => {
//   res.send("啦啦啦啦啦啦啦"); //res.send()  响应字符串
// });

// 获取json数据
// router.get("/json",(req, res) => {
//   res.json({
//     code:200,
//     msg:"获取json数据成功",
//     url:req.url,  //"url":"/json?"
//     query:req.query,  //"query":{"id":"6","ij":"9"} ?后面的查询参数
//     // headers : req.headers,  //请求头
//     path:req.path  //"path":"/json"
//   })
// })

// router.get("/ooo/:eno", (req, res) => {
//   res.json({
//     params:req.params ///json/:eno  获取冒号后面的参数，地址栏里面要带有
//   })
// })

// router.all("/all", (req, res) => {
//   res.send("这是一个既能接受get请求，又可以接受post请求，但浏览器打不开，需要安装Postman插件（接口调试）")
// })

// router.post("/post", (req, res) => {  //但是地址栏输入post打不开
//   console.log(req.body);
//   res.json({
//     code:200,
//     msg:"这是一个post请求",
//     body:req.body //req.body  获取Post提交的参数
//   })
//   res.send("啦啦啦啦啦啦啦");
// })

module.exports = router;
