const http = require("http");   //协议，node模块
const hostname = "localhost";   //主机
const port = 666;    //端口

// request请求  客户端发送到服务器端的请求（请求的参数）
// response响应     服务器端返回给客户端的数据响应（JSON HTML 格式数据）
const server = http.createServer(function(request,response){    //创建服务器
    
    if(request.url !== "/favicon.ico"){ //过滤 icon请求
        console.log(request.url);
        response.writeHead(200, {"content-Type":"text/html;charset=utf8"}); //解决乱码和编译标签
        response.write(`<h2>hello world</h2>`);
        response.write(`<h2>你好</h2>`);
        response.write(`<h2>你好2</h2>`);
        response.end(`<h2>hello 张三</h2>`);
    }
    
}).listen(port, hostname, () => {   //链式操作
    console.log(`first node server is running successful at http://${hostname}:${port}`);
})