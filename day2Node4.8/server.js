const http = require("http");
function initServer(url,data){
    http.createServer((req, res) => {   //https需要域名证书
        if(req.url === url){
            // 1.打印json数据
            res.writeHead(200,{"Content-Type":"application/json"}); //表示接受json数据
            res.write(data);
            res.end();
        }
    }).listen(3000, "localhost", ()=> {
        console.log("server init successful");
    });
}

exports.initServer = initServer;