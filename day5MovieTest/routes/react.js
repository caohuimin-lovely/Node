var express = require("express");
var router = express.Router();

const {
    Liuyan,
    User,
    Tw,
    Advise,
    Employee,
    Tfproducts,
    Good
} = require("../utils/model")

const {
    createToken
} = require("../utils/token")

// 测试接口
router.get("/index", (req, res) => {
    res.json({
        code: 200,
        msg: "测试react接口",
        result: null
    })
})

// 查询留言
router.get("/getComments", (req, res) => {
    Liuyan.find({}, {})
        .then(result => {
            res.json({
                msg: "获取留言数据成功",
                code: 200,
                result
            })

        })
})
// 删除留言
router.post("/delCommit", (req, res) => {
    var {
        delId
    } = req.body
    Liuyan.deleteMany({
        _id: delId
    })
        .then(result => {
            res.json({
                msg: "评论删除成功",
                code: 200,
                type: 0,
                result
            })
        }).catch(err => {
            res.json({
                code: 500,
                msg: "服务器异常",
                err,
                type: 0,
            })
        })
})
// 修改留言
// 添加留言
router.post("/addComment", (req, res) => {
    var body = req.body;
    Liuyan.insertMany(body)
        .then(data => {
            Liuyan.find({}, {})
                .then(result => {
                    res.json({
                        msg: "评论成功",
                        code: 200,
                        result,
                        type: 1
                    })

                })
        }).catch(err => {
            res.json({
                code: 200,
                msg: "评论失败",
                err,
                type: 0,
            })
        })
})

// 注册
router.post("/register", (req, res) => {
    var body = req.body;
    User.findOne({
        mobile: body.mobile
    }).then(data => {
        if (data) {
            res.json({
                code: 200,
                msg: "注册失败,手机号码已经被注册",
                result: null,
                type: 0
            })
        } else {
            body.time = new Date();
            body.type = 0;  //默认普通用户
            User.insertMany(body).then(result => {
                res.json({
                    code: 200,
                    msg: "注册成功,立马登录",
                    result: result,
                    type: 1
                })
            })
        }
    })
})

// 登录
router.post("/login", (req, res) => {
    var body = req.body;
    console.log(body);
    User.findOne({
        mobile: body.mobile
    }).then(result => {

        if (result) {   //已注册
            if (result.password == body.password) {
                // result.type = body.type;
                // 普通用户 type没有 默认0 false
                // 管理员用户 type 1 true
                // console.log(body.type.target.value); //这是前端传来的复选框的值
                // console.log(r·esult.type);   //这是数据库中的type值      //如果两个相同就可以登录  如果 1登录0   0登录1都是 无权限
                const token = createToken(result.mobile);
                if (result.type) {    //管理员逻辑
                    if (result.type == body.type.target.value) {  //说明为管理员用户  1 === 1 
                        res.json({
                            msg: "管理员用户登录成功",
                            code: 200,
                            type: 1,
                            result,
                            token
                        })
                    } else {
                        res.json({
                            msg: "该账号是管理员用户，请选择管理员",
                            code: 200,
                            type: 0,
                            result,
                            token
                        })
                    }

                } else {  //普通用户逻辑
                    if (result.type == body.type.target.value) {  //说明为普通用户 0 === 0
                        res.json({
                            msg: "普通用户登录成功",
                            code: 200,
                            type: 1,
                            result,
                            token
                        })
                    } else {
                        res.json({
                            msg: "该账户是普通用户，请选择普通用户",
                            code: 200,
                            type: 0,
                            result,
                            token
                        })
                    }
                }

            } else {
                res.json({
                    msg: "登录失败，密码或者手机号不正确",
                    code: 200,
                    type: 0,
                    result
                })
            }
        } else {    //未注册
            res.json({
                msg: "登录失败，手机号未注册,请先注册",
                code: 200,
                type: 0,
                result
            })
        }
    })
})

// 提交每日居民体温
router.post("/insertwendu", (req, res) => {
    var body = req.body;
    body.time = new Date();
    body.toggle = body.wendu * 1 < 37.4;
    Tw.insertMany(body).then(result => {
        res.json({
            msg: "每日体温登记成功",
            code: 200,
            result
        })
    })
})

// 查询体温
router.post("/showtiwens", (req, res) => {
    var body = req.body;
    Tw.find({
        mobile: body.mobile
    }).sort({ _id: -1 }) //降序显示，先加入的，放在最上面
        .then(result => {
            res.json({
                msg: "获取体温数据成功",
                code: 200,
                result
            })
        })
})

// 删除体温记录
router.post("/deltw", (req, res) => {
    var {
        _id
    } = req.body;
    Tw.deleteMany({
        _id: _id
    }).then(result => {
        res.json({
            code: 200,
            msg: "删除体温成功",
            result,
            type: 1
        })
    }).catch(err => {
        res.json({
            code: 500,
            msg: "服务器异常",
            err,
            type: 0
        })
    })
})

// 修改体温记录
router.post("/updatetiwen", (req, res) => {
    var {
        uid,
        wendu
    } = req.body;
    Tw.updateMany({
        _id: uid
    }, {
        $set: {
            wendu,
            toggle: wendu * 1 < 37.4
        }
    }).then(result => {
        res.json({
            code: 200,
            msg: "修改成功",
            result,
            type: 1
        })
    }).catch(ErrorEvent => {
        res.json({
            code: 500,
            msg: "服务器异常，修改失败",
            err,
            type: 0
        })
    })
})

// 管理员新增用户
router.post("/adduser", (req, res) => {
    var body = req.body;
    User.findOne({
        mobile: body.mobile
    }).then(data => {
        if (data) {
            res.json({
                code: 200,
                msg: "居民用户添加失败,手机已经存在",
                result: null,
                type: 0
            })
        } else {
            body.time = new Date();
            body.type = 0;   // 默认就是普通用户 
            User.insertMany(body).then(data => {
                User.find({ type: 0 }).sort({ _id: -1 })
                    .then(result => {
                        res.json({
                            code: 200,
                            msg: "居民用户添加成功",
                            result: result,
                            type: 1
                        })
                    })
            })
        }
    })
})

// 查询所有的用户
router.post("/getusers", (req, res) => {
    var body = req.body;
    User.find({ type: 0 }).sort({ _id: -1 })
        .then(result => {
            res.json({
                code: 200,
                msg: "获取普通用户信息成功",
                result: result,
                type: 1
            })
        }).catch(err => {
            res.json({
                code: 500,
                msg: "服务器异常，获取普通用户信息失败",
                err,
                type: 0
            })
        })
})

// 删除居民信息
router.post("/deluser", (req, res) => {
    var {
        delId
    } = req.body;
    User.deleteMany({
        _id: delId
    }).then(result => {
        res.json({
            code: 200,
            msg: "居民用户删除成功..",
            result,
            type: 1
        })
    }).catch(err => {
        res.json({
            code: 500,
            msg: "服务器异常",
            err,
            type: 0
        })
    })
});

// 修改核酸 isText
router.post("/updateusertest", (req, res) => {
    var {
        uid,    //用户id
        isTest  //是否核酸检测
    } = req.body;
    User.updateMany({
        _id: uid
    }, {
        $set: {
            isTest
        }
    }).then(result => {
        res.json({
            code: 200,
            msg: "核酸检测修改成功",
            result,
            type: 1
        })
    }).catch(err => {
        res.json({
            code: 500,
            msg: "服务器异常，核酸检测修改失败",
            err,
            type: 0
        })
    })

})

// 修改居民信息
router.post("/updateuser", (req, res) => {
    var {
        _id,
        value
    } = req.body;
    User.updateMany({
        _id: _id
    }, {
        $set: value
    }).then(result => {
        res.json({
            code: 200,
            msg: "居民信息修改成功",
            result,
            type: 1
        })
    }).catch(err => {
        res.json({
            code: 200,
            msg: "服务器异常，居民信息修改失败",
            err,
            type: 0
        })
    })
})

// 查询建议
router.post("/getadvises", (req, res) => {
    var body = req.body;
    Advise.find({}).sort({ _id: -1 })
        .then(result => {
            res.json({
                code: 200,
                msg: "获取意见成功",
                result: result,
                type: 1
            })
        })
})

// 插入意见
router.post("/addadvise", (req, res) => {
    var body = req.body;
    body.time = new Date();
    Advise.insertMany(body).then(result => {
        res.json({
            code: 200,
            msg: "意见添加成功",
            result: result,
            type: 1
        })
    }).catch(err => {
        res.json({
            code: 500,
            msg: "服务器异常，意见添加失败",
            err,
            type: 0
        })
    })
})

// 删除advise
router.post("/deladvise", (req, res) => {
    var {
        delId
    } = req.body;
    Advise.deleteMany({
        _id: delId
    }).then(result => {
        res.json({
            code: 200,
            msg: "意见删除成功",
            result,
            type: 1
        })
    }).catch(err => {
        res.json({
            code: 500,
            msg: "服务器异常，删除失败",
            err,
            type: 0
        })
    })
})

// 查询建议详情
router.post("/getadvisebyid", (req, res) => {
    var body = req.body;
    Advise.findOne({
        _id: body._id
    }).then(result => {
        res.json({
            code: 200,
            msg: "获取意见详情信息成功",
            result,
            type: 1
        })
    }).catch(err => {
        res.json({
            code: 500,
            msg: "服务器异常，获取意见详情信息失败",
            err,
            type: 0
        })
    })
})

// 修改建议
router.post("/updateadvise", (req, res) => {
    var {
        _id,
        value
    } = req.body;
    Advise.updateMany({
        _id: _id
    }, {
        $set: value
    }).then(result => {
        res.json({
            code: 200,
            msg: "意见信息修改成功",
            result,
            type: 1
        })
    })
})

// 查询所有的goods
router.get("/getallgoods", (req, res) => {
    var limit = req.query.limit * 1 || 0;
    Good.find({}, { '10id': 0, 'zhu10id': 0, id: 0 })
        .limit(limit).sort({ _id: -1 })
        .then(result => {
            res.json({
                msg: "获取商品成功",
                code: 200,
                result,
                type : 1
            })
        }).catch(err => {
            res.json({
                msg : "服务器异常，获取商品失败",
                code : 500,
                err,
                type : 0
            })
        })
})

// 查询种类
router.get("/getgoodstypes",(req, res) => {
    Good.distinct("type")
    .then(result => {
        res.json({
            msg : "获取商品分类成功",
            code : 200,
            result,
            type : 1
        })
    }).catch(err => {
        res.json({
            msg : "服务器异常，获取商品分类失败",
            code : 500,
            err,
            type : 0
        })
    })
})

// 添加员工
router.post("/insertemp", (req, res) => {
    var body = req.body;
    console.log(body);

    Employee.findOne({
        mobile: body.mobile
    }).then(data => {
        if (data) {
            res.json({
                code: 200,
                msg: "员工添加失败，手机号已经存在",
                result: null,
                type: 0
            })
        } else {
            body.time = new Date();
            body.type = 0;
            Employee.insertMany(body).then(result => {
                res.json({
                    code: 200,
                    msg: "员工添加成功",
                    result: result,
                    type: 1
                })
            })
        }
    }).catch(err => {
        res.json({
            code: 500,
            msg: "员工添加失败，服务器异常",
            err,
            type: 0
        })
    })
})


// 查询所有的员工
router.post("/getAllEmp", (req, res) => {
    var body = req.body;
    Employee.find({ type: 0 }).sort({ _id: -1 })
        .then(result => {
            res.json({
                code: 200,
                msg: "获取员工信息成功",
                result: result,
                type: 1
            })
        }).catch(err => {
            res.json({
                code: 500,
                msg: "服务器异常，获取员工信息失败",
                err,
                type: 0
            })
        })
})

// 删除员工信息
router.post("/deleteempbyid", (req, res) => {
    console.log(req.body);

    var {
        _id
    } = req.body
    Employee.deleteOne({
        _id: _id
    }).then(result => {
        res.json({
            code: 200,
            msg: "员工删除成功",
            result,
            type: 1
        })
    }).catch(err => {
        res.json({
            code: 500,
            msg: "员工删除异常,服务器异常",
            err,
            type: 0
        })
    })
})

// 更新员工信息
router.post("/updateempbyid", (req, res) => {
    var {
        _id,
        value
    } = req.body;
    console.log(req.body);
    Employee.updateMany({
        _id: _id
    }, {
        $set: value
    }).then(result => {
        res.json({
            code: 200,
            msg: "员工信息修改成功",
            result,
            type: 1
        })
    }).catch(err => {
        res.json({
            code: 200,
            msg: "服务器异常，员工信息修改失败",
            err,
            type: 0
        })
    })

})

// 获取所有的商品
router.post("/getallproducts", (req, res) => {
    Tfproducts.find({}).then(result => {
        res.json({
            type: 1,
            code: 200,
            msg: "获取商品数据成功",
            result
        })
    }).catch(err => {
        res.json({
            type: 0,
            code: 500,
            msg: "服务器异常，获取商品数据失败",
            err
        })
    })
})

// 按照种类查询
router.post("/getkindof", (req, res) => {
    var {
        type
    } = req.body
    console.log(req.type);

    Tfproducts.find({
        type: type
    }).then(result => {
        res.json({
            type: 1,
            code: 200,
            msg: "获取商品数据成功",
            result
        })
    }).catch(err => {
        res.json({
            type: 0,
            code: 500,
            msg: "服务器异常，获取商品数据失败",
            err
        })
    })
})

module.exports = router;