// 聊天室服务器代码

// 服务器端 socket功能
// 1. 创建服务器   绑定ip + 端口 监听端口
// 2. 监听客户端的连接
// 3. 监听客户端发来的消息
// 4. 把来自客户端的消息转发给其他的在线用户端
// 5. 监听客户端的关闭
const ws = require("ws");   //webSocket模块缩写
const webSocketServer = ws.Server;
const port = 3900;

// 1. 创建服务器   绑定ip + 端口 监听端口

const wss = new webSocketServer({port});    //启动服务器socket 监听3900端口
console.log(`webSocket is running at ws://0.0.0.0:3900`);   //特有的ws协议

let count = 0;
let info = "NZ1903_";
let clientUserMap = {};

// 2. 监听客户端的连接
// on emit 监听 发送
wss.on("connection", (socket) => {  //socket来自客户端的连接对象    客户端连接成功
    console.log("客户端socket上线了");
    // 给每个用户分配一个流水号
    count++;
    socket.name = info + count;
    clientUserMap[socket.name] = socket;

    // 3. 监听客户端发来的消息
    socket.on("message", (msg) => {
        console.log(msg);
        // 4. 把来自客户端的消息转发给其他的在线用户端
        boradcast(socket, msg);
    });

    // 5. 监听客户端的关闭
    socket.on("close",()=>{
        boradcast(socket,"886,我下线了...");
        // 对象删除  delete obj[key]
        delete clientUserMap[socket.name] ; 
    })
})  

function boradcast(socket, msg){{
    for(var i in clientUserMap){
        var hour = new Date().getHours();
        var min = new Date().getMinutes();
        clientUserMap[i].send(`${socket.name}说:(${hour}:${min}) ${msg}${msg}`);    //发送消息
    }
}}
