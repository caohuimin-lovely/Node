// spider爬虫
// 拉勾网信息

const url = "https://www.lagou.com/";
const https = require("https");
const querystring = require("querystring");
const cheerio = require("cheerio"); //类似于jQuery的插件，服务端使用 
const http = require("http");

// 通过代码来模拟访问服务器
https.get(url, res => { //res表示服务器的响应数据
    console.log("状态码:",res.statusCode);
    console.log("请求头：",res.headers);
    console.log("请求头：",querystring.stringify(res.headers)); //将请求头的数据用=&转换成字符串
    
    // 状态码: 200
    // 请求头： {
    // server: 'nfs/1.0.2',
    // date: 'Wed, 08 Apr 2020 13:23:20 GMT',
    // 'content-type': 'text/html;charset=UTF-8',
    // 'transfer-encoding': 'chunked',
    // connection: 'close',
    // vary: 'Accept-Encoding',
    // 'set-cookie': [
    //     'JSESSIONID=ABAAABAAAEEAAIIAA4AC95598E29E05C3875867B2FF3802; Path=/; HttpOnl
    // y'
    // ],
    // request_id: '8b9c15ee-e4d7-488e-ab89-1a8c45d719be',
    // 'content-language': 'en-US',
    // 'cache-control': 'no-cache'
    // }

    var htmlData = "";
    var count = 0;

    // 监听响应数据 传输
    res.on("data", d => {
        htmlData += d;
        count++;
    });

    // 监听响应数据 传输完毕
    res.on("end", () => {
        console.log("输出次数："+count);  //60  
        // 解析htmlData，获取你想要的数据
        getHtmlData(htmlData);
    });
}).on("error", (err) => {
    console.log("响应失败" + err);
});

// jQuery
// each html text eq find
// DOM对象 如何转换为jQuery对象 用$包起来
// jQuery对象如何转换为DOM对象  $()[0]  $().get(0)
// each 循环遍历DOM得到真实DOM
// 元素数组，伪数组
function getHtmlData(data){
    let $ = cheerio.load(data); //$使用jQuery
    let mains = $('#sidebar').find(".menu_main");
    console.log(mains.length);
    let dataList = [];
    mains.each((index, ele) => {
        // let title = ele.find("h2").text();   //报错，因为ele为真实DOM，不能拿jQuery操作，应该转换成jQuery对象
        let title = $(ele).find("h2").text().trim();    //trim去掉空格
        console.log(title);
        console.log("-------------------------------");
        let jobsList = [];
        let jobs = $(ele).find("a");    //伪数组
        jobs.each((index, item) => {
            let jobtitle = $(item).find("h3").text().trim();
            console.log(jobtitle);
            jobsList.push(jobtitle);
        });
        console.log("-------------------------------");
        dataList.push({
            title,
            jobsList
        });
        console.log(dataList); 
    });
    initServer(dataList);   //不能写在循环里面
}

// 服务器打印数据
function initServer(data){
    http.createServer((req, res) => {   //https需要域名证书
        if(req.url === "/list"){
            // 1.打印json数据
            // res.writeHead(200,{"Content-Type":"application/json"}); //表示接受json数据
            // res.write(JSON.stringify(data));
            // res.end();

            // 2.ul li 列表
            res.writeHead(200,{"content-type":"text/html;charset=utf8"});
            var oul = "<ul>";
            data.forEach((item, index) => {
                oul += `<li><h2>${item.title}</h2>`;
                oul += "<ol>";
                item.jobsList.forEach((val, index) => {
                    oul += `<li>${index}----${val}</li>`
                });
                oul += "</ol></li>";
            });
            oul += "</ul>";
            res.write(oul);
            res.end();
        }
    }).listen(3000, "localhost", ()=> {
        console.log("server init successful");
    });
}