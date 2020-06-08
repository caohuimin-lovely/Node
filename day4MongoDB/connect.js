// node连接 mongodb数据库
// 工具 mongoose

const mongoose = require("mongoose");
const {
    User,
    Student,
    Mv,
    Coupon,
    Product
} = require("./model")

const hostname = "0.0.0.0";
const port = "27017";
const dbname = "nz1903";
const user = "?";   //给你的数据库，上一把锁
const password = "?";

const conn_db_url = `mongodb://${hostname}:${port}/${dbname}`;  //!!!!!!!!!
//开始数据库连接
mongoose.connect(conn_db_url, {
    useNewUrlParser: true,  //解决警告
    useUnifiedTopology : true
}, (err) => {
    if (err) {
        console.log("数据库连接失败");
        throw err;
    } else {
        console.log("数据库连接成功");

    }
});  

// 操作数据库的增删查改
// 插入----insertMany
// User.insertMany([
//     {
//         username : "1234",
//         password : "2222",
//         age : 75
//     },
//     {
//         username : "ggggg",
//         password : "77777"
//     }
// ],(err, result) => {
//     if(err) throw err;
//     console.log(result); 
// })

// Student.insertMany([{   
//     stuname : "蓝绿蓝绿"
// }],(err, result) => {
//     if(err) throw err;
//     console.log(result); 
// })

// 更新-----updateMany
// User.updateMany(
//     {},
//     {
//         $set:{
//             password : "5888",
//             age : 52
//         }
//     }
// ).then(result => {  //成功回调
//     console.log(result);
// }).catch(err => {   //错误回调
//     throw err;
// })

// 删除-----remove
// User.remove({
//     username : "ggggg"
// }).then(result => {
//     console.log(result);
// }).catch(err => {
//     throw err;
// })

// 查询-----find 
// User.find(
//     {},
//     {}
// ).sort({age:1}).then(result => {
//     console.log(result); 
// })

Mv.find(
    {},
    {
        _id:0,
        title:1,
        year:1
    }
).sort({year:-1}).limit(5).then(result => {
    console.log(result);  
})

const connection = mongoose.connection;
// 监听数据库的连接状态
// 连接成功
connection.on("connected",() => {
    console.log("mongoose连接成功");
});
// 连接失败
connection.on("error", (err) => {
    console.log("mongoose连接失败" + err);
});
// 连接断开
connection.on("disconnected", () => {
    console.log("mongoose连接断开");
})
