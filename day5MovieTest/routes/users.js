var express = require('express');
var router = express.Router();
let {
  User
} = require("../utils/model");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 注册
router.post("/zhuce", (req, res) => {
  let body = req.body;
  console.log(body);

  User.findOne({  //获得输入的username
    username:body.username
  }).then(result => {
    console.log(result);
    if(result){ //用户名存在
      res.send(`<script>alert("用户名已经被注册,请重新注册!");location.href='/zhuce'</script>`);
    }else{  //用户名不存在
      body.time = new Date(); //记录注册的时间
      User.insertMany(body).then(data => {  //将body插入到数据库中
        res.send(`<script>alert("注册成功，立即跳转登录");location.href='/login?username=${body.username}'</script>`)
      }).catch(err => { //失败
        res.send(`<script>alert("服务器异常");location.href='./zhuce'</script>`)
      })
    }
  })
})

// 登录
// router.post("/userlogin",(req, res) => {
//   let body = req.body;
//   console.log(body);
//   //查询你输入的用户名和密码是否匹配并存在
//   User.findOne({
//     username:body.username
//   }).then(result => {
//     if(result){
//       if(result.password === body.password){
//         //记住你的登录状态  username保存下来(session cookies)
//         // session记录用户从登录状态到退出登录或者关闭网页这段时间内保存的所有数据
//         // 登录成功直接跳转到首页home
//         // res.send("登录成功");
//         req.session.username = body.username;
//         console.log(req.session);
//         res.redirect("/home");  //redirect重定向
//       }else{
//         res.send(`<script>alert("用户名或者密码不正确,请重新登录");location.href="/login"</script>`);
//       }
//     }else{
//       res.send(`<script>alert("用户名不对,请重新登录");location.href="/login"</script>`);
//     }
//   })
// })

router.post("/userlogin",(req,res)=>{
  let body = req.body;
  console.log(body);
  console.log(req.session); //undefine
  
  // 登录必须用户名和密码都匹配成功 
  User.findOne({
      username:body.username,
      password:body.password
  }).then(result=>{
    if(result){
      // 跳转首页
      // 把用户名存储到 req.session 
      req.session.username = result.username;
      console.log(req.session);
      res.redirect("/home");
    }else{
      res.send(`<script>alert('用户名或者密码错误,请重新登录');location.href='/login'</script>`)
    }
  })
})

// 修改个人信息
router.post("/changeinfo",(req, res) => {
  let body = req.body;
  console.log(body);
  if(req.session.username){
    User.updateMany({
      username:req.session.username
    },{
      $set:body
    }).then(result => {
      res.json({
        "msg" : "个人信息修改成功",
        result,
        code : 200
      });
    })
  }else{
    res.send(`<script>alert("登录失效，请重新登录");location.href='/login'</script>`)
  }
})

// 修改密码
router.post("/changePwd",(req, res) => {
  let body = req.body;
  // let {
  //   prepwd,
  //   newpwd,
  //   renewpwd
  // } = req.body;
  console.log(body);
  
  if(req.session.username){ //表示已经登录
    User.findOne({
      username : req.session.username
    }).then(data => {
      if(data.password === body.prepwd){ //判断原始密码是否一致
        User.updateMany({
          username : req.session.username
        },{
          $set : {
            password : body.newpwd,
            confirmpwd : body.renewpwd
          }
        }).then(result => {
          // res.send("密码重置成功");
          // res.json();
          // res.render() ajax 绝对不能渲染ejs文件
          res.json({
            code : 200,
            msg : "密码重置成功",
            type : 1
          })
        })
      }else{
        res.json({
          code : 200,
          msg : "原始密码输入错误，重置密码失败",
          type : 0
        })
      }
    })
  }else{
    res.send(`<script>alert("登录失效，请重新登录");location.href='/login'</script>`)
  }

  // if(req.session.username){
  //   User.findOne({
  //     username:req.session.username,
  //     password:body.prepwd
  //   }).then(result => {
  //     User.updateMany({
  //       username:req.session.username
  //     },{
  //       $set: {
  //         password : body.newpwd,
  //         confirmpwd : body.renewpwd
  //       }
  //     }).then(result => {
  //       res.json({
  //         "msg" : "密码修改成功",
  //         result,
  //         code : 200
  //       });
  //     })
  //   }).catch(err => {
  //     res.send(`<script>alert("旧密码错误");location.href='/resetpwd'</script>`)
  //   })
    
  // }else{
  //   res.send(`<script>alert("登录失效，请重新登录");location.href='/login'</script>`)
  // }
})
module.exports = router;
