// vue项目的路由模块
// 后端写接口 前端通过ajax（XMLHttpRequest去请求）
const express = require("express");
const router = express.Router();
const {
    Mv,
    User,
    Coupon,
    Product,
    Cart,
    Eater
} = require("../utils/model");

var {
    aesEncrypt, //加密
    aesDecrypt, //解密
    keys    //秘钥
} = require("../utils")

var multer = require('multer')

router.get("/", (req, res) => {
    res.json({
        msg: "这是一个vue项目的接口",
        result: null
    })
})

// 查询电影数据的接口
router.get('/movie', (req, res) => {
    var {
        limit
    } = req.query;
    limit = limit * 1 || 0;
    Mv.find({}, { _id: 0 }).limit(limit).sort({ _id: -1 })
        .then(result => {
            // res.render(ejs); //渲染的这一步，丢经小黑屋
            res.json({
                msg: "获取电影数据成功",
                code: 200,
                result
            })
        })
})

// 注册接口
router.post("/register", (req, res) => {
    var body = req.body;
    console.log(body);
    // 注册逻辑
    User.findOne({
        mobile: body.mobile
    }).then(data => {
        if (data) {   //用户名已存在，重新注册
            res.json({
                code: 200,
                msg: '注册失败，手机号码已存在',
                data,
                type: 0    //前端通过type判断是否注册成功
            })
        } else {  //立即注册
            body.time = new Date()
            User.insertMany(body).then(result => {
                res.json({
                    code: 200,
                    msg: '注册成功',
                    result,
                    type: 1    //前端通过type判断是否注册成功
                })
            })
        }
    })
})

// 登录接口
router.post("/login", (req, res) => {
    var body = req.body;
    console.log(body);
    User.findOne({
        mobile: body.mobile
    }).then(data => {
        if (data.password === body.password) {
            let token = aesEncrypt(data.mobile + data.username + data.password, keys);
            req.session.mobile = data.mobile;
            req.session.username = data.username;
            req.session.token = token;
            res.json({
                msg: "登录成功",
                type: 1,
                code: 200,
                data,
                token   //一定要发送给客服端
            })

        } else {
            res.json({
                msg: "登录失败，用户名或密码错误",
                type: 0,
                code: 200

            })
        }
    })
})

// 获取用户信息接口
router.get("/getuserinfo", (req, res) => {
    console.log(req.session);
    User.findOne({
        mobile: req.session.mobile
    }).then(result => {
        res.json({
            msg: "获取用户信息成功",
            code: 200,
            type: 1,
            result
        })
    })
})

// 选择硬盘存储
var storage = multer.diskStorage({
    destination: function (req, file, cb) {  //上传的目录
        cb(null, './public/upload');
    },
    filename: function (req, file, cb) { //上传的文件名
        cb(null, Date.now() + "nz1903" + file.originalname);   //加上时间之后 文件名就永远不会冲突
    }
})
var upload = multer({ storage: storage }).any(); //接受任何格式的文件

// 上传头像 multer
router.post("/uploadimg", upload, (req, res) => {
    console.log("文件上传成功");
    console.log(req.files);
    if (req.files) {
        var path = req.files[0].path;
        User.updateOne({
            mobile: req.session.mobile
        }, {
            $set: {
                pic: path
            }
        }).then(result => {
            res.json({
                code: 200,
                msg: '头像上传成功',
                type: 1,
                path: path,
                result,
                mobile: req.session.mobile
            })
        })

    } else {
        res.json({
            code: 200,
            msg: '头像上传失败',
            type: 0,
        })
    }
})

// 获取头像
router.post("/getpic", (req, res) => {
    User.findOne({
        mobile: req.session.mobile
    }).then(result => {
        if (result.pic) {
            res.json({
                msg: '获取头像成功',
                code: 200,
                type: 1,
                result
            })
        } else {
            res.json({
                msg: '获取头像失败',
                code: 200,
                type: 0,
                result
            })
        }
    })
})

// 获取所有优惠券接口
router.get("/getcoupon", (req, res) => {
    Coupon.find({}, { _id: 0 })
        .then(result => {
            res.json({
                msg: "获取优惠券数据成功",
                code: 200,
                result
            })
        })
})


// 获取所有的商品列表
router.get("/getproducts", (req, res) => {
    Product.find({}, { _id: 0 })
        .then(result => {
            res.json({
                msg: "获取商品数据成功",
                code: 200,
                result
            })
        })
})

// 获取商品信息列表
router.get("/getgoodinfo", (req, res) => {
    var query = req.query;
    console.log(query);
    Product.findOne({
        id: query.goodId
    }).then(result => {
        res.json({
            msg: "获取商品数据成功",
            code: 200,
            result
        })
    })
})

// 添加购物车信息
// 逻辑
//     判断是否登录
//         如果登录
//             判断是否第一次添加
//                 如果第一次添加   执行插入操作
//             如果多次添加    执行数量+1操作
//         如果未登录 直接不进行任何操作.返回msg
router.post("/insertcart", (req, res) => {
    var body = req.body;
    console.log(body);
    if (req.session.token) {  //表示已经登录，token存在
        Cart.findOne({
            goodId: body.id
        }).then(data => {
            if (data) {   //表示已经存在商品id  直接数量更新+1即可
                Cart.updateOne({
                    userMobile: req.session.mobile,
                    goodId: body.id
                }, {
                    $inc: {
                        num: 1
                    }
                }).then(result => {
                    res.json({
                        code: 200,
                        msg: '数量加1',
                        data,
                        type: 1,
                        result
                    })
                })
            } else {  //表示商品id不存在，需要插入(第一次)
                Cart.insertMany({
                    userMobile: req.session.mobile,
                    goodId: body.id,
                    imageUrl: body.imageUrl,
                    title: body.productName,
                    price: body.price,
                    num: 1,
                    isChecked: body.isChecked
                }).then(result => {
                    res.json({
                        code: 200,
                        msg: '加购成功',
                        data,
                        type: 1,
                        result
                    })
                })
            }
        })
    } else {
        res.json({
            code: 200,
            msg: '未登录',
            data,
            type: 0
        })
    }
})

// 获取购物车
router.get("/getcartlist", (req, res) => {
    Cart.find({
        userMobile: req.session.mobile
    }, { _id: 0 })
        .then(result => {
            res.json({
                msg: "获取购物车列表成功",
                code: 200,
                result
            })
        })
})

// 更新数量num
// 数量减一
router.post("/reducenum", (req, res) => {
    var body = req.body;
    console.log(body);
    Cart.updateOne({
        userMobile: body.mobile,
        goodId: body.goodId
    }, {
        $inc: {
            num: -1
        }
    }).then(result => {
        res.json({
            msg: "数量增加成功",
            code: 200,
            result
        })
    })

})

// 数量加一
router.post("/plusnum", (req, res) => {
    var body = req.body;
    console.log(body);
    Cart.updateOne({
        userMobile: body.mobile,
        goodId: body.goodId
    }, {
        $inc: {
            num: 1
        }
    }).then(result => {
        res.json({
            msg: "数量增加成功",
            code: 200,
            result
        })
    })

})

router.post("/inputchange", (req, res) => {
    var body = req.body;
    console.log(body);
    Cart.updateOne({
        userMobile: body.mobile,
        goodId: body.goodId
    }, {
        $set: {
            num: body.num
        }
    }).then(result => {
        res.json({
            msg: "数量修改成功",
            code: 200,
            result
        })
    })
})


router.post("/changechecked", (req, res) => {
    var body = req.body;
    console.log(body);
    Cart.updateOne({
        goodId: body.goodId,
    }, {
        $set: {
            isChecked: body.isChecked
        }
    }).then(result => {
        res.json({
            msg: "勾选成功",
            code: 200,
            result
        })
    })
})

router.post("/changechecked2", (req, res) => {
    var body = req.body;
    console.log(body);
    Cart.updateOne({
        goodId: body.goodId,
    }, {
        $set: {
            isChecked: body.isChecked
        }
    }).then(result => {
        res.json({
            msg: "勾选取消成功",
            code: 200,
            result
        })
    })
})

// 获取吃客信息
router.get("/geteaterlist", (req, res) => {
    Eater.find({}, { _id: 0 })
        .then(result => {
            res.json({
                msg: "获取吃客信息列表成功",
                code: 200,
                result
            })
        })
})

// 获取吃客详情信息
router.get("/geteaterinfo", (req, res) => {
    var query = req.query;
    console.log(query);
    Eater.find({
        id : query.eaterId
    }, { _id: 0 })
        .then(result => {
            res.json({
                msg: "获取吃客信息列表成功",
                code: 200,
                result
            })
        })
})

module.exports = router;