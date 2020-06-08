// 新建一个路由 评论模块
const express = require("express");
const router = express.Router();
const {
    checkSession,
    dateFormat
} = require("../utils");    //判断是否登录
const {
    Mv,
    Comment,
    Uid,
    Coupon,
    Product,
    Cart
    
} = require("../utils/model");

router.get("/",(req, res) => {
    res.send("this is my movie comment router module...")
})

router.get("/index", (req, res) => {
    let {
        mid
    } = req.query;  //根据mid去查询当前这条电影的数据信息
    checkSession(req, res, () => {
        Mv.findOne({
            id : mid
        }).then(result => {
            res.render("comment", {result});
        })
        
    })
})


// 插入数据库
router.post("/submit",(req, res) => {
    let body = req.body;
    console.log(body);
    let {
        mid
    } = req.query;
    checkSession(req, res, () => {
        // 1.查询电影详情
        // 2.获取自增长的id 
        // 3.插入

        // findOneAndUpdate
        Mv.findOne({
            id:mid
        }).then(movie => {
            Uid.findOneAndUpdate({
                name : "comments",
            },{
                $inc:{
                    id : 1
                }
            },{
                new : true  //返回更新之后的数据
            }).then(obj => {
                body.time = dateFormat();
                body.id = obj.id;
                body.username = req.session.username;
                body.mid = movie.id;
                body.mtitle = movie.title;
                body.mpic = movie.images.large;
                Comment.insertMany(body)
                .then(result => {
                    req.session.mid = mid;
                    console.log(result);
                    // res.send("ddddd")
                    res.redirect("/comment/mlist");
                })
            })
        })
        // Mv.findOne({    //获取到当前的电影信息
        //     id:mid  
        // }).then(movie => {
        //     Uid.updateMany({
        //         name:"comments",
        //     },{
        //         $inc:{
        //             id:1
        //         }
        //     }).then(data => {
        //         Uid.findOne({
        //             name:"comments"
        //         }).then(obj => {
        //             console.log(obj);   //自增的id  mongodb不能实现表链接查询
        //             // 插入操作
        //             body.time = dateFormat();
        //             body.id = obj.id;
        //             body.username = req.session.username;
        //             body.mid = movie.id;
        //             body.mtitle = movie.title;
        //             body.mpic = movie.images.large;

        //             // 评论插入
        //             Comment.insertMany(body).then(result => { //[{"_id":"5e95e6a464cb3e2de8f42764","title":"1212","content":"121","time":"2020-4-15 0:36:52","id":12,"mid":"1292722","mtitle":"泰坦尼克号","__v":0}]
        //             res.redirect("/comment/mlist"); //重定向到电影评论列表页面
        //             })
        //         })
        //     })
        // })
    })
})
// 电影评论列表
router.get("/mlist", (req, res) => {
    checkSession(req, res,() => {
        // 当前所有电影评论
        // 当前页码 pageNo 默认为1
        // 总条数   total
        // 每页显示的数据  pageSize
        // 总页数 totalPage
        let query = req.query;  //获取地址栏?后面的数据
        let pageNo = query.pageNo * 1 || 1;
        let total = 0;
        let pageSize = query.pageSize * 1 || 4;
        let totalPage = 0;

        Comment.find()
        .then(result => {
            if(result.length > 0){
                total = result.length;
                totalPage = Math.ceil(total/pageSize);  //向上取整
                pageNo = pageNo <= 1 ? 1 : pageNo;  //当页码小于1时 为1
                pageNo = pageNo >= totalPage ? totalPage : pageNo;  //当页码大于总页码时，设为总页码
            }
            Comment.find()
            .sort({_id:-1}) //排序，评论的显示在最前面
            .skip((pageNo - 1) * pageSize)  //跳过多少数据
            .limit(pageSize)    //每页显示pageSize条数据
            .then(data => {
                res.render("mlist", {
                    result : data,
                    username : req.session.username,
                    total,
                    pageSize,
                    totalPage,
                    pageNo
                })
            })
        })

        // // 渲染电影评论评论
        // Comment.find({},{}).sort({_id:-1}).then(data => {
        //     res.render("mlist", {
        //         result : data,
        //         username : req.session.username
        //     });
        // })
        
    })
})

// 获取电影的所有评论
router.get("/showAllComments", (req, res) => {
    let query = req.query;
    console.log(query);
    
    res.send('ooooooooo');
})

// 删除评论
router.get("/delete", (req, res) => {
    const {
        _id 
    } = req.query;  //获取到地址栏?后面的参数
    console.log(999);
    
    console.log(_id);
    res.send("删除成功");
    checkSession(req, res, () =>{
        // 删除deleteMany 根据_id删除
        Comment.deleteMany({
            _id : _id
        }).then(result => {
            res.json({
                code : 200,
                msg : "评论删除成功",
                type : 1,
                result
            })
        })
    })
})

// 修改评论
router.post("/update", (req, res) => {
    const body = req.body;
    console.log(body);
    // 修改操作
    Comment.updateMany({
        id : body.id
    },{
        $set : {
            title : body.title,
            content : body.content
        }
    }).then(result => {
        res.json({
            msg: "评论修改成功",
            code : 200,
            type : 1,
            result
        })
    })
})
module.exports = router;