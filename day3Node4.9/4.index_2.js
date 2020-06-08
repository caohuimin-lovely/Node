const fs = require("fs");
// 操作文件
// 一个模块暴露多个模块
exports.readHtmlFile = function(path,req, res) {
    fs.readFile(path, "utf8", (err, data) => {
        if(err) {console.log(err)}
        // console.log(data);
        res.writeHead(200,{"content-type":"text/html;charset=utf8"});
        res.write(data);
        res.end();
    });
}

// 封装读取JSON文件的函数
exports.readJSONFile = function(path, req, res){
    fs.readFile(path, "utf8", (err,data) => {
        if(err) {console.log(err);}
        res.writeHead(200,{"content-type":"application/json"});
        res.write(data);
        res.end();
    })
}

// 封装读取图片的函数
exports.readImgFile = function(path, req, res){
    fs.readFile(path, "binary", (err,data) => {
        if(err) {console.log(err);}
        res.writeHead(200,{"content-type":'jpeg'});
        res.write(data,"binary");
        res.end();
    })
}

// 在package.json文件中的script中 可以加入"start": "node 4.server.js"
// 然后控制台在输入 npm run start
// 就可以执行对应的模块
// start 是可以唯一一个可以缩写的 npm start