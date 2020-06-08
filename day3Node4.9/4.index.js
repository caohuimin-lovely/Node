const {
    readHtmlFile,
    readJSONFile,
    readImgFile
} = require("./4.index_2");
const url = require("url");
const {parse} = require("querystring");
const fs = require("fs");
module.exports = {
    home(req, res) {
        readHtmlFile("html/4.home.html", req, res);  //路径有问题  
    },
    login(req, res) {
        // 接收前端传过来的数据
        // get
        const query = url.parse(req.url, true).query;
        console.log(query);

        // post
        let postData = "";
        // 监听数据传输的方式来获取formdata
        req.on("data", d => {
            postData += d;
        })
        // 监听数据传输完毕
        req.on("end",() => {
            console.log("请求提交完毕");
            postData = parse(postData);
            console.log(postData);
            
        })
        readHtmlFile("html/4.login.html", req, res);
    },
    register(req, res) {
        readHtmlFile("html/4.register.html", req, res);
    },
    my(req, res) {
        readHtmlFile("html/4.my.html", req, res);
    },
    list(req, res){
        readJSONFile("./goodlist.json",req, res);
    },
    img(req, res){
        readImgFile("imgs/2.jpg", req, res);
    },
    imgs(req, res){
        // 静态资源服务器
        let pathname = url.parse(req.url).pathname.replace(/\//,"");
        console.log(pathname);  //img/2.jpg
        let dirname = pathname.split("/")[0];   //img 获取图片文件夹名称
        let filename = pathname.split("/")[1];  //读取图片名  split()拆分成数组
        let files = fs.readdirSync(dirname);    //读取图片目录里面的文件名
        console.log(files);
        let flag = false;   //假设没有匹配  没有这张图片
        files.forEach((item) => {
            if(item == filename){
                flag = true;
            }
        });
        flag ? readImgFile(pathname, req, res) : readHtmlFile("html/404.html", req, res);
    },
    notFound(req, res){
        res.writeHead(200,{"content-type":"text/html;charset=utf8"});
        res.write(`<h2>404 Not Found</h2>`);
        res.end();
    }
    // home(req, res){
    //     res.write(`<h2>node 动态加载页面---home</h2>`)
    //     res.end();
    // },
    // login(req, res){
    //     res.write(`<h2>node 动态加载页面---login</h2>`)
    //     res.end();
    // },
    // register(req, res){
    //     res.write(`<h2>node 动态加载页面---register</h2>`)
    //     res.end();
    // },
    // my(req, res){
    //     res.write(`<h2>node 动态加载页面---my</h2>`)
    //     res.end();
    // },
    // notFound(req, res){
    //     res.write(`<h2>NOT FOUND</h2>`)
    //     res.end();
    // }

}