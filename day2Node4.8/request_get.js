// 模拟访问别人的接口，把别人的接口数据移植到自己的服务器
// 抓接口数据
// https如果没有写端口，就是443
// http如果没有写端口，就是80
const urlApi = "https://zuozhaoxi.com:1910/react/getGoodList";
const https = require("https");
const url = require("url");
const {initServer} = require("./server")

const {stringify} = require("querystring"); //对象解构
const options = {
    hostname:"zuozhaoxi.com",
    port:1910,
    path:"/react/getGoodList",
    method:"GET"
}

const req = https.request(options, res => {
    console.log("状态码：", res.statusCode);
    console.log("请求头：", stringify(res.headers));

    let jsonData = "";
    // 监听响应数据
    res.on("data", d => {
        jsonData += d;
    });
    // 响应数据完毕
    res.on("end", () => {
        console.log(jsonData);
        initServer("/goodList", jsonData);
    });
});
req.on("error", err => {
    console.log("数据库请求失败===" + err); 
});
req.end();  //请求完毕