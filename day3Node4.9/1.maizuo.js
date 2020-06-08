// 抓取卖座电影的数据
const urlLink = "https://m.maizuo.com/gateway?type=2&cityId=310100&k=7177188";
const https = require("https");
const url = require("url");
const {stringify} = require("querystring");

const urlObj = url.parse(urlLink);
console.log(urlObj);

const options = {
    hostname : urlObj.hostname,
    port : urlObj.port ? url.port : 443,
    path : urlObj.path,
    method : "GET",
    headers : { //简单配置请求头    人家服务器做了简单的判断，防止别人盗用接口
        "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.0.4","e":"1586329724644245094557","bc":"310100"}',
        'X-Host': 'mall.cfg.common-banner'
    }
}
const req = https.request(options, res =>{
    console.log("状态码：", res.statusCode);    //判断是否请求成功
    console.log("请求头", stringify(res.headers));  //转换为字符串
    
    let maizuoData = "";
    // 监听数据响应
    res.on("data", d => {
        maizuoData += d;
    });
    // 监听响应结束
    res.on("end", () => {
        console.log("获取卖座电影数据结束....");
        console.log(maizuoData);
    });
});

req.on("error", err => {
    console.log("请求发送失败----" + err);
});
req.end();  //监听请求结束