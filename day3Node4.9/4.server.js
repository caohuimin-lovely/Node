const http = require("http");
const url = require("url");
const hostname = "0.0.0.0"; //主机
const port = 3000;

// 路由(匹配成功密码就能连接)  动态加载页面
// Node路由（匹配路径里面的pathname 匹配成功就加载对应的页面或者数据）
const rotue = require("./4.index")
const server = http.createServer((req, res) => {
    if(req.url !== "/favicon.ico"){
        // console.log(req.url);
        const pathname = url.parse(req.url).pathname.replace(/\//,"");   //解析接口url  将/替换成空隙
        console.log(pathname);
        res.writeHead(200,{"content-type":"text/html;charset=utf8"});
        try{
            if(pathname.indexOf("imgs" !== -1)){
                rotue["imgs"](req, res);
            }else{
                rotue[pathname](req, res);
            }
            
        }catch{
            console.log("pathname 没有匹配成功");
            rotue['notFound'](req, res);
            // throw err;  //抛出异常会阻断
        }



        
        // if(req.url === "/"){
        //     res.writeHead(200,{"content-type":"text/html;charset=utf8"});
        //     res.write(`<h2>node 动态加载页面---路由</h2>`)
        //     res.end();
        // }else if(req.url === "/home"){
        //     res.writeHead(200,{"content-type":"text/html;charset=utf8"});
        //     res.write(`<h2>node 动态加载页面---home</h2>`)
        //     res.end();
        // }else if(req.url === "/login"){
        //     res.writeHead(200,{"content-type":"text/html;charset=utf8"});
        //     res.write(`<h2>node 动态加载页面---login</h2>`)
        //     res.end();
        // }else if(req.url === "/register"){
        //     res.writeHead(200,{"content-type":"text/html;charset=utf8"});
        //     res.write(`<h2>node 动态加载页面---register</h2>`)
        //     res.end();
        // }else{
        //     res.writeHead(200,{"content-type":"text/html;charset=utf8"});
        //     res.write(`<h2>NOT FOUND</h2>`)
        //     res.end();
        // }
        
    }
}).listen(port, hostname, () => {
    console.log(`node server is running at http://${hostname}:${port}`);
    
})