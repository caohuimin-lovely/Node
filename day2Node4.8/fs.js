// fs fileSystem   文件系统
// 操作文件


let fs = require("fs");
// 得到文件与目录信息   stat
fs.stat("./server.js", (err, stats) => {
    if(err) throw err;  //有异常就抛出异常，暂停执行
    console.log(stats);
    console.log(stats.isFile() ? "这是一个文件":"这是一个目录");    //false 判断是不是一个文件
    console.log(stats.isDirectory());   //true  判断是不是一个文件夹
});

// 新建一个目录
fs.mkdir("./logs",(err) => {
    if(err) throw err;
    console.log("logs 创建成功...");
    
});

