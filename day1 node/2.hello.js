const http = require("http");
const hostname = '0.0.0.0'; //泛指所有的ip范围
const port = 555;

const server = http.createServer((req, res) => {
    if(req.url !== "/favicon.ico"){
        res.writeHead(200,{"Content-type":"text/html;charset=utf8"});
        res.write(`<h2>你好，hello.js</h2>`);
        res.end();
    }

});

server.listen(port);