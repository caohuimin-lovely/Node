
//  node 链接 mongodb 数据库  
//  工具 mongoose   

const mongoose = require("mongoose"); 

const hostname = "0.0.0.0"
const port = 27017
const dbname = "nz1903"
const user = "?"    // 给你的数据库 上一把锁 
const password = "?"

const conn_db_url = `mongodb://${hostname}:${port}/${dbname}`;  // 数据库链接错误

mongoose.connect(conn_db_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if(err){
        console.log("mongodb-数据库链接失败");
        throw err;
    }else{
        console.log("mongodb-数据库链接-success")
    }
});    // 开始链接数据库



// 监听数据库的链接状态
const connection = mongoose.connection;
// 连接成功
connection.on("connected",()=>{
    console.log("mongoose 链接成功")
});
// 连接异常
connection.on("error",(err)=>{
    console.log("Mongoose connection error " + err);
})
// 连接断开
connection.on("disconnected",()=>{
    console.log("Mongoose connection 断开 ")
});

// 暴露
module.exports = connection;

